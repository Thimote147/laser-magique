const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

module.exports = (db) => {
  const router = express.Router();

  // Check availability
  router.get('/availability/:date/:participants', (req, res) => {
    try {
      const { date, participants } = req.params;

      const bookings = db.prepare(
        'SELECT * FROM bookings WHERE date LIKE ?'
      ).all(`${date}%`);

      // Calculate available slots in 30-minute intervals
      let timeSlots = {};
      const currentDate = new Date();
      const selectedDate = new Date(date);

      for (let hour = 10; hour <= 20; hour++) {
        timeSlots[`${hour}:00`] = {
          available: true,
          remainingSpots: 20 - participants
        };
        timeSlots[`${hour}:30`] = {
          available: true,
          remainingSpots: 20 - participants
        };
      }

      // If the selected date is today, set past time slots to unavailable
      if (selectedDate.toDateString() === currentDate.toDateString()) {
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();

        for (let hour = 10; hour <= currentHour; hour++) {
          if (hour < currentHour || (hour === currentHour && currentMinutes >= 30)) {
            timeSlots[`${hour}:00`].available = false;
            timeSlots[`${hour}:00`].remainingSpots = 0;
          }
          if (hour < currentHour || (hour === currentHour && currentMinutes >= 0)) {
            timeSlots[`${hour}:30`].available = false;
            timeSlots[`${hour}:30`].remainingSpots = 0;
          }
        }
      }

      bookings.forEach(booking => {
        const bookingDate = new Date(booking.date);
        const hour = bookingDate.getHours();
        const minutes = bookingDate.getMinutes();
        const slot = minutes < 30 ? `${hour}:00` : `${hour}:30`;
        timeSlots[slot].remainingSpots -= booking.nbr_pers;
        if (timeSlots[slot].remainingSpots <= 0) {
          timeSlots[slot].available = false;
        }
      });

      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create booking
  router.post('/create', async (req, res) => {
    try {
      const { firstname, lastname, phone, email, participants, date, activity_id, quantity, deposit, total } = req.body;

      // Calculate price based on activity and quantity
      // const activity = db.prepare('SELECT * FROM activities WHERE activity_id = ?').get(activity_id);
      // const price = activity.first_price * quantity;

      // Create reservation
      const result = db.prepare(
        'INSERT INTO bookings (firstname, lastname, phone, email, nbr_pers, date) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(firstname, lastname, phone, email, participants, date);

      db.prepare(
        'INSERT INTO activity_res (booking_id, activity_id, nbr_pers, nbr_parties, deposit, amount, total) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).run(result.lastInsertRowid, activity_id, participants, quantity, deposit, total - deposit, total);

      res.json({
        success: true,
        bookingId: result.lastInsertRowid,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get All bookings
  router.get('/all', (req, res) => {
    try {
      const { start_date, end_date } = req.query;

      let query = 'SELECT b.*, a.name AS activity, a.type, ar.deposit FROM bookings b LEFT JOIN activity_res ar ON b.booking_id = ar.booking_id LEFT JOIN activities a ON ar.activity_id = a.activity_id';
      let params = [];

      if (start_date && end_date) {
        query += ' WHERE b.date BETWEEN ? AND ?';
        params.push(start_date, end_date);
      }

      let bookings = db.prepare(query).all(...params);

      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get booking by ID
  router.get('/:id', (req, res) => {
    try {
      const booking = db.prepare(
        'SELECT b.*, a.name AS activity, a.type, ar.deposit, ar.amount, ar.total FROM bookings b LEFT JOIN activity_res ar ON b.booking_id = ar.booking_id LEFT JOIN activities a ON ar.activity_id = a.activity_id WHERE b.booking_id = ?'
      ).get(req.params.id);

      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};