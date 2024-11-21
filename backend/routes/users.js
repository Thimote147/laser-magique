const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/:id', (req, res) => {
        try {
            const user = db.prepare('SELECT firstname FROM users WHERE user_id = ?').get(req.params.id);
            if (user) {
                res.json({ firstname: user.firstname });
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};