const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.get('/', (req, res) => {
        try {
            const activities = db.prepare('SELECT * FROM activities').all();
            const activitiesByType = activities.reduce((acc, activity) => {
                acc[activity.type] = acc[activity.type] || [];
                acc[activity.type].push(activity);
                return acc;
            }, {});
            res.json(activitiesByType);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};