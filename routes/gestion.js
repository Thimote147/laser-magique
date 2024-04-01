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
}


function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    if (date.getMinutes() < 10) {
        return `${date.getHours()}:0${date.getMinutes()}`;
    } else {
        return `${date.getHours()}:${date.getMinutes()}`;
    }
}


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

router.post('/update_infos', (req, res) => {
    req.session.id_res = req.body.reservation;
    res.redirect("/reservation");
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
    Gestion.addReservation(req.body.firstname, "", "", "", req.body.persons, req.body.date, req.body.activities, req.body.resComment, 0);
    res.redirect('/gestion');
});

module.exports = router;