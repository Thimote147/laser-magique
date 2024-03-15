const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");

router.get('/', (req, res) => {
    res.render("accueil.hbs");
});

router.post('/reservation', (req, res) => {
    Gestion.addReservation(req.body);
    res.redirect('/accueil');
});

module.exports = router;