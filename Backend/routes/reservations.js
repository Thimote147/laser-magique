const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/today/hours', (req, res) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const reservations = db.prepare('SELECT date, COUNT(*) as nbr_pers FROM reservations WHERE date LIKE ? GROUP BY date ORDER BY date').all(`${today}%`);
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

    router.get('/:id', (req, res) => {
        try {
            const resDetails = db.prepare('SELECT * FROM reservations WHERE reservation_id = ?').get(req.params.id);
            res.json(resDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post('/add', (req, res) => {
        try {
            const { firstname, nbr_pers, type, date, activity, quantity } = req.body;
            const res_id = db.prepare('INSERT INTO reservations (firstname, nbr_pers, group_type, date) VALUES (?, ?, ?, ?)').run(firstname, nbr_pers, type, date).lastInsertRowid;
            db.prepare('INSERT INTO activity_res (reservation_id, activity_id, quantity) VALUES (?, ?, ?)').run(res_id, activity, quantity);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};