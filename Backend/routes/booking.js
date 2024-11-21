const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

module.exports = (db) => {
  const router = express.Router();

  // Email configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Check availability
  router.get('/availability/:date', (req, res) => {
    try {
      const { date } = req.params;
      const bookings = db.prepare(
        'SELECT * FROM reservations WHERE date LIKE ?'
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
        console.log("Nombre de personnes => "+booking.nbr_pers);
        if (timeSlots[hour].remainingSpots <= 0) {
          timeSlots[hour].available = false;
        }
      });

      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create booking with payment
  router.post('/create', async (req, res) => {
    try {
      const { firstname, nbr_pers, type, date, activity_id, quantity, paymentMethodId } = req.body;

      // Calculate price based on activity and quantity
      const activity = db.prepare('SELECT * FROM activities WHERE activity_id = ?').get(activity_id);
      const price = activity.first_price * quantity;

      // Process payment with Stripe
      const payment = await stripe.paymentIntents.create({
        amount: price * 100, // Stripe expects amounts in cents
        currency: 'eur',
        payment_method: paymentMethodId,
        confirm: true,
      });

      if (payment.status === 'succeeded') {
        // Create reservation
        const result = db.prepare(
          'INSERT INTO reservations (firstname, nbr_pers, group_type, date) VALUES (?, ?, ?, ?)'
        ).run(firstname, nbr_pers, type, date);

        db.prepare(
          'INSERT INTO activity_res (reservation_id, activity_id, quantity) VALUES (?, ?, ?)'
        ).run(result.lastInsertRowid, activity_id, quantity);

        // Send confirmation email
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: req.userData.email,
          subject: 'Booking Confirmation - Laser Magique',
          html: `
            <h1>Booking Confirmation</h1>
            <p>Thank you for your booking!</p>
            <p>Details:</p>
            <ul>
              <li>Date: ${new Date(date).toLocaleString()}</li>
              <li>Activity: ${activity.name}</li>
              <li>Number of people: ${nbr_pers}</li>
              <li>Total paid: €${price}</li>
            </ul>
          `
        });

        res.json({ 
          success: true, 
          bookingId: result.lastInsertRowid,
          message: 'Booking confirmed and email sent' 
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};