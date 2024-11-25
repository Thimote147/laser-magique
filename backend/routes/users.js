const express = require('express');

const toMinutes = (date) => {
    if (!date) return 0;
    const [hours, minutes] = date.split(':').map(Number);
    return hours * 60 + minutes;
};

const toHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
};

const toCurrency = (hours, hourlyRate) => {
    const [hoursWorked, minutesWorked] = hours.split('h').map(Number);
    const total = hoursWorked * hourlyRate + (minutesWorked / 60) * hourlyRate;
    return total.toFixed(2);
};

module.exports = (db) => {
    const router = express.Router();

    router.get('/:id', (req, res) => {
        try {
            const user = db.prepare('SELECT * FROM users WHERE user_id = ?').get(req.params.id);
            if (user) {
                user.hours = db.prepare('SELECT * FROM hours WHERE user_id = ? ORDER BY date DESC, beginning DESC').all(req.params.id);
                res.json(user);
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post('/:id/addHours', (req, res) => {
        try {
            const user_id = req.params.id;
            const { date, hours, value } = req.body;
            if (value === true) {
                db.prepare('INSERT INTO hours (user_id, date, beginning) VALUES (?, ?, ?)').run(user_id, date, hours);
            } else {
                const hour = db.prepare('SELECT * FROM hours WHERE user_id = ? ORDER BY date DESC, beginning DESC LIMIT 1').get(user_id);
                if (hour) {
                    hourly_rate = db.prepare('SELECT hourly_rate FROM users WHERE user_id = ?').get(user_id).hourly_rate;
                    db.prepare('UPDATE hours SET ending = ?, nbr_hours = ?, amount = ? WHERE user_id = ? AND date = ? AND beginning = ?').run(hours, toHours(toMinutes(hours) - toMinutes(hour.beginning)), toCurrency(toHours(toMinutes(hours) - toMinutes(hour.beginning)), hourly_rate), user_id, hour.date, hour.beginning);
                } else {
                    res.status(404).json({ error: 'Heure non trouvée' });
                    return;
                }
            }
            res.json({ message: 'Heures ajoutées' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};