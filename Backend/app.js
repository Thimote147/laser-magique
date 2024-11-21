require('dotenv').config();
const express = require('express');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { execFileSync } = require('child_process');

const authMiddleware = require('./middleware/auth');
const usersRouter = require('./routes/users');
const reservationsRouter = require('./routes/reservations');
const activitiesRouter = require('./routes/activities');
const foodRouter = require('./routes/food.js');
const authRouter = require('./routes/auth');
const bookingRouter = require('./routes/booking');

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Run the initDB.js script to initialize the database
const initDBScriptPath = path.resolve(__dirname, 'scripts', 'initDB.js');
execFileSync('node', [initDBScriptPath]);

// Database initialization
const db = new Database(path.resolve(__dirname, 'data', 'gestion.db'), {  
  verbose: console.log,
});

// Initialize admin user if not exists
const initializeAdmin = () => {
  const adminExists = db.prepare('SELECT * FROM users WHERE role = ?').get('admin');
  if (!adminExists) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(
      'admin@lasermagique.com',
      hashedPassword,
      'Admin',
      'admin'
    );
  }
};

initializeAdmin();

// Public routes
app.use('/auth', authRouter(db));
app.use('/activities', activitiesRouter(db));

// Protected routes
app.use('/users', authMiddleware, usersRouter(db));
app.use('/reservations', authMiddleware, reservationsRouter(db));
app.use('/food', authMiddleware, foodRouter(db));
app.use('/booking', authMiddleware, bookingRouter(db));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;