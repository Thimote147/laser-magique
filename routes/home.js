const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");

router.get('/', (req, res) => {
    res.render("home.hbs", { photos1_5: Gestion.photos(1, 5), photos6_10: Gestion.photos(6, 10) });
});

router.post('/reservation', (req, res) => {
    let amount;

    if (req.body.activities === "Laser Game") {
        amount = 8 * req.body.persons;
    } else if (req.body.activities === "Réalité Virtuelle") {
        amount = 10 * req.body.persons;
    } else if (req.body.activities === "Cyber Games") {
        amount = 20 * req.body.persons;
    } else if (req.body.activities === "Anniversaire Laser Game") {
        if (req.body.persons <= 10) {
            amount = 200;
        } else {
            amount = 20 * req.body.persons;
        }
    } else if (req.body.activities === "Anniversaire Trio Pack") {
        if (req.body.persons <= 8) {
            amount = 280;
        } else {
            amount = 35 * req.body.persons;
        }
    } else if (req.body.activities === "Family Trio Pack") {
        amount = 35 * req.body.persons;
    } else if (req.body.activities === "Laser Game + Réalité Virtuelle") {
        amount = 18 * req.body.persons;
    } else if (req.body.activities === "Laser Game + Cyber Games") {
        amount = 28 * req.body.persons;
    } else if (req.body.activities === "Réalité Virtuelle + Cyber Games") {
        amount = 30 * req.body.persons;
    } else if (req.body.activities === "Laser Game + Réalité Virtuelle + Cyber Games") {
        amount = 38 * req.body.persons;
    }

    Gestion.addReservation(req.body.firstname, req.body.lastname, req.body.email, req.body.phone_number, req.body.persons, req.body.date, req.body.activities, req.body.resComment, amount);
    res.redirect('/accueil#booking');
});

module.exports = router;