const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/:id', (req, res) => {
        try {
            const user = db.prepare('SELECT * FROM users WHERE user_id = ?').get(req.params.id);
            if (user) {
                user.hours = db.prepare('SELECT * FROM hours WHERE user_id = ? ORDER BY date').all(req.params.id);
                res.json(user);
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};