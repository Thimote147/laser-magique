const express = require('express');
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Bcrypt = require('bcrypt');
const { forToday } = require("./functions/function.js");

router.get('/', (req, res) => {
    res.render('home.hbs');
});

router.get('/get_reservations', (req, res) => {
    res.send(forToday(Gestion.reservations()));
});

router.post('/add_reservation', (req, res) => {
    if (Gestion.member(req.body.user) !== undefined) {
        if (Bcrypt.compareSync(req.body.password, Gestion.login(req.body.user))) {
            if (req.body.lastname === undefined) {
                req.body.lastname = "";
            }
            if (req.body.email === undefined) {
                req.body.email = "";
            }
            if (req.body.phone_number === undefined) {
                req.body.phone_number = "";
            }

            let amount;

            let nbr_laser = 0;
            let nbr_vr = 0;
            let nbr_ct = 0;

            if (req.body.activities === "Laser Game") {
                nbr_laser++;
                amount = 8 * req.body.persons * nbr_laser
            } else if (req.body.activities === "Réalité Virtuelle") {
                nbr_vr++;
                amount = 10 * req.body.persons * nbr_vr
            } else if (req.body.activities === "Cyber Games") {
                nbr_ct++;
                amount = 20 * req.body.persons * nbr_ct
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
            }
            else if (req.body.activities === "Famille Trio Pack") {
                nbr_laser++;
                nbr_vr++;
                nbr_ct++;
                amount = 35 * req.body.persons;
            } else if (req.body.activities === "Laser Game + Réalité Virtuelle") {
                nbr_laser++;
                nbr_vr++;
                amount = ((8 * req.body.nbr_laser) + (10 * req.body.nbr_vr)) * req.body.persons;
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
                amount = 35 * req.body.persons
            }

            Gestion.addReservation(req.body.firstname, req.body.lastname, req.body.email, req.body.phone_number, req.body.persons, req.body.date, req.body.activities, "", nbr_laser, nbr_vr, nbr_ct, amount);
            res.status(200).send();
        }
    }
});

router.post('/delete_reservation', (req, res) => {
    if (Gestion.member(req.body.user) !== undefined) {
        if (Bcrypt.compareSync(req.body.password, Gestion.login(req.body.user))) {
            Gestion.deleteReservation(req.body.id);
            res.status(200).send();
        }
    }
});

// router.get('/get_conso', (req, res) => {
//     if (Gestion.member(req.body.user) !== undefined) {
//         if (Bcrypt.compareSync(req.body.password, Gestion.login(req.body.user))) {
//             Gestion.
//         }
//     }
// });

module.exports = router;