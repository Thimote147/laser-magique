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
      console.log(req.body);

      const { firstname, lastname, phone, email, participants, date, activity_id, quantity } = req.body;

      // Calculate price based on activity and quantity
      // const activity = db.prepare('SELECT * FROM activities WHERE activity_id = ?').get(activity_id);
      // const price = activity.first_price * quantity;

      console.log('ok 1');

      // Create reservation
      const result = db.prepare(
        'INSERT INTO bookings (firstname, lastname, phone, email, nbr_pers, date) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(firstname, lastname, phone, email, participants, date);

      console.log('ok 2');

      db.prepare(
        'INSERT INTO activity_res (booking_id, activity_id, quantity) VALUES (?, ?, ?)'
      ).run(result.lastInsertRowid, activity_id, quantity);

      console.log('ok 3');

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
      const bookings = db.prepare('SELECT b.*, a.name, a.type FROM bookings b LEFT JOIN activity_res ar ON b.booking_id = ar.booking_id LEFT JOIN activities a ON ar.activity_id = a.activity_id').all();
      console.log(bookings);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};