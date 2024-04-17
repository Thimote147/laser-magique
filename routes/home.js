const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");

router.get('/', (req, res) => {
    res.render("home.hbs", { photos1_5: Gestion.photos(1, 5), photos6_10: Gestion.photos(6, 10) });
});

router.post('/reservation', (req, res) => {
    let amount;
    let nbr_laser = 0;
    let nbr_vr = 0;
    let nbr_ct = 0;

    if (req.body.activities === "Laser Game") {
        nbr_laser++;
        amount = 8 * req.body.persons;
    } else if (req.body.activities === "Réalité Virtuelle") {
        nbr_vr++;
        amount = 10 * req.body.persons;
    } else if (req.body.activities === "Cyber Games") {
        nbr_ct++;
        amount = 20 * req.body.persons;
    } else if (req.body.activities === "Anniversaire Laser Game") {
        nbr_laser = 3;
        if (req.body.persons <= 10) {
            amount = 200;
        } else {
            amount = 20 * req.body.persons;
        }
    } else if (req.body.activities === "Anniversaire Trio Pack") {
        nbr_laser++;
        nbr_vr++;
        nbr_ct++;
        if (req.body.persons <= 8) {
            amount = 280;
        } else {
            amount = 35 * req.body.persons;
        }
    } else if (req.body.activities === "Family Trio Pack") {
        nbr_laser++;
        nbr_vr++;
        nbr_ct++;
        amount = 35 * req.body.persons;
    } else if (req.body.activities === "Laser Game + Réalité Virtuelle") {
        nbr_laser++;
        nbr_vr++;
        amount = 18 * req.body.persons;
    } else if (req.body.activities === "Laser Game + Cyber Games") {
        nbr_laser++;
        nbr_ct++;
        amount = 28 * req.body.persons;
    } else if (req.body.activities === "Réalité Virtuelle + Cyber Games") {
        nbr_vr++;
        nbr_ct++;
        amount = 30 * req.body.persons;
    } else if (req.body.activities === "Laser Game + Réalité Virtuelle + Cyber Games") {
        nbr_laser++;
        nbr_vr++;
        nbr_ct++;
        amount = 38 * req.body.persons;
    }

    Gestion.addReservation(req.body.firstname, req.body.lastname, req.body.email, req.body.phone_number, req.body.persons, req.body.date, req.body.activities, req.body.resComment, nbr_laser, nbr_vr, nbr_ct, amount);
    res.redirect('/accueil#booking');
});

module.exports = router;