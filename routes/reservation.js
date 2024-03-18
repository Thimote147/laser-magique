const express = require('express');
const router = express.Router();
const Gestion = require('../models/Gestion.js');

router.get('/', (req, res) => {
    if (req.session.connected) {
        res.render("reservation.hbs", { reservation: Gestion.findById(req.session.id_res) });
    } else {
        res.render("login.hbs")
    }
});

router.post('/update_infos', (req, res) => {
    Gestion.updateReservation(req.body);
    res.redirect('/gestion');
});

module.exports = router;