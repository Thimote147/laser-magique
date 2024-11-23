const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

module.exports = (db) => {
  const router = express.Router();

  // Check availability
  router.get('/availability/:date', (req, res) => {
    try {
      const { date } = req.params;
      const bookings = db.prepare(
        'SELECT * FROM bookings WHERE date LIKE ?'
      ).all(`${date}%`);
      
      // Calculate available slots
      const timeSlots = {};
      for (let hour = 10; hour <= 21; hour++) {
        timeSlots[hour] = {
          available: true,
          remainingSpots: 20 // Maximum capacity
        };
      }

      bookings.forEach(booking => {
        const hour = new Date(booking.date).getHours();
        timeSlots[hour].remainingSpots -= booking.nbr_pers;
        if (timeSlots[hour].remainingSpots <= 0) {
          timeSlots[hour].available = false;
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
      const { firstname, nbr_pers, type, date, activity_id, quantity } = req.body;

      // Calculate price based on activity and quantity
      const activity = db.prepare('SELECT * FROM activities WHERE activity_id = ?').get(activity_id);
      const price = activity.first_price * quantity;

        // Create reservation
        const result = db.prepare(
          'INSERT INTO bookings (firstname, nbr_pers, group_type, date) VALUES (?, ?, ?, ?)'
        ).run(firstname, nbr_pers, type, date);

        db.prepare(
          'INSERT INTO activity_res (reservation_id, activity_id, quantity) VALUES (?, ?, ?)'
        ).run(result.lastInsertRowid, activity_id, quantity);

        res.json({ 
          success: true, 
          bookingId: result.lastInsertRowid,
          message: 'Booking confirmed and email sent' 
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get All bookings
  router.get('/all', (req, res) => {
    try {
      const bookings = db.prepare('SELECT * FROM bookings').all();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};