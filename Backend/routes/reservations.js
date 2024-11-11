const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/today/hours', (req, res) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const reservations = db.prepare('SELECT DISTINCT date FROM reservations WHERE date LIKE ? ORDER BY date').all(`${today}%`);
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get('/today', (req, res) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const reservations = db.prepare('SELECT * FROM reservations WHERE date LIKE ? ORDER BY date').all(`${today}%`);
            res.json(reservations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};