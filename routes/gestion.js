const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");

function today(milliseconds) {
    const date = new Date(milliseconds);
    const todayDate = new Date();

    if (
        date.getFullYear() === todayDate.getFullYear() &&
        date.getMonth() === todayDate.getMonth() &&
        date.getDate() === todayDate.getDate()
    ) {
        return true;
    }
    return false;
};


function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    if (date.getMinutes() < 10) {
        return `${date.getHours()}:0${date.getMinutes()}`;
    } else {
        return `${date.getHours()}:${date.getMinutes()}`;
    }
};


router.get('/', (req, res) => {
    if (req.session.connected) {
        const reservations = Gestion.reservations();
        const forToday = [];
        reservations.forEach((reservation) => {
            if (today(reservation.date) === true) {
                reservation.date = formatDate(reservation.date);
                forToday.push(reservation);
            };
        });
        res.render("gestion.hbs", { weapons: Gestion.weapons(), headsets: Gestion.headsets(), trikes: Gestion.trikes(), reservations: forToday });
    } else {
        res.render("login.hbs");
    }
});

router.post('/cancel', (req, res) => {
    Gestion.cancel(req.body.reservation);
    res.redirect("/gestion");
});

router.post('/delete', (req, res) => {
    Gestion.delete(req.body.reservation);
    res.redirect("/gestion");
});

router.post('/add_reservation', (req, res) => {
    Gestion.addReservation(req.body.firstname, "", "", "", req.body.persons, new Date(req.body.date).getTime(), req.body.activities, "", 0);
    res.redirect('/gestion');
});

router.post('/update_infos', (req, res) => {
    let price;
    if (req.body.activities === "Laser Game") { price = 8 }
    if (req.body.activities === "Réalité Virtuelle") { price = 10 }
    if (req.body.activities === "Cyber Games") { price = 20 }
    if (req.body.activities === "Anniversaire Laser Game") { price = 20 }
    if (req.body.activities === "Anniversaire Trio Pack") { price = 35 }
    if (req.body.activities === "Famille Trio Pack") { price = 35 }
    if (req.body.activities === "Laser Game + Réalité Virtuelle") { price = 18 }
    if (req.body.activities === "Laser Game + Cyber Games") { price = 28 }
    if (req.body.activities === "Réalité Virtuelle + Cyber Games") { price = 30 }
    if (req.body.activities === "Laser Game + Réalité Virtuelle + Cyber Games") { price = 38 }

    const remaining = (price * req.body.persons) - req.body.deposit - req.body.payment_bcc - req.body.payment_cash;
    const total = (price * req.body.persons);

    Gestion.updateReservation(req.body.id, req.body.persons, req.body.activities, req.body.nbr_laser, req.body.nbr_vr, req.body.nbr_ct, req.body.deposit, req.body.payment_bcc, req.body.payment_cash, req.body.payment_by, remaining, total);
    res.redirect('/gestion');
});

module.exports = router;