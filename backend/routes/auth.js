const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

module.exports = (db) => {
  const router = express.Router();

  // Login validation
  const loginValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 4 }) // Change to 6
  ];

  // Register validation
  const registerValidation = [
    body('firstname').trim().notEmpty(),
    body('lastname').trim().notEmpty(),
    body('phone').trim().matches(/^\+?\d{1,3}?\s?\d{1,4}?\s?\d{1,4}?\s?\d{1,4}(?:\s?\d{1,4})?(?:x.+)?$/), // Validate phone with or without country code and spaces
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 4 }), // Changed to 6
  ];

  // Login route
  router.post('/login', loginValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

      console.log(user);

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  });

  // Register route
  router.post('/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstname, lastname, phone, email, password } = req.body;
      const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      const hashedPassword = bcrypt.hashSync(password, 10);
      const result = db.prepare(
        'INSERT INTO users (firstname, lastname, phone, email, password, role) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(firstname, lastname, phone, email, hashedPassword, 'user');

      const token = jwt.sign(
        { userId: result.lastInsertRowid, email, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({ token, user: { user_id: result.lastInsertRowid, firstname, lastname, phone, email, role: 'user' } });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  });

  return router;
};