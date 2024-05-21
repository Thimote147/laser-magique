const express = require('express');
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('home.hbs');
});

router.get('/get_reservations', (req, res) => {
    if (Gestion.member(req.query.user) !== undefined) {
        if (Bcrypt.compareSync(req.query.password, Gestion.login(req.query.user))) {
            res.send(Gestion.reservations());
        }
    }
});

module.exports = router;