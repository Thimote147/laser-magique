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

    // router.post('/data', (req, res) => {
    //     const { field1, field2 } = req.body;
    //     try {
    //         const insert = db.prepare('INSERT INTO table_name (field1, field2) VALUES (?, ?)');
    //         const result = insert.run(field1, field2);
    //         res.json({ message: 'Données insérées avec succès', id: result.lastInsertRowid });
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // });

    return router;
};