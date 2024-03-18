const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");

router.get('/', (req, res) => {
    res.render("accueil.hbs");
});

router.post('/reservation', (req, res) => {
    Gestion.addReservation(req.body.firstname, req.body.lastname, req.body.email, req.body.phone_number, req.body.persons, req.body.date, req.body.activities, req.body.resComment);
    res.redirect('/accueil');
});

module.exports = router;