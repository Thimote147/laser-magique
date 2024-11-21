const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        try {
            const food = db.prepare('SELECT * FROM food ORDER BY name').all();
            res.json(food);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

    return router;
};