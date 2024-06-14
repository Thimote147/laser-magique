const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Reservation = require("../models/Reservation.js");
const Stock = require("../models/Stock.js");
const { formatDateTime, formatHour, price } = require("./functions/function.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        let InfosReservation;
        let stocks = [];

        Gestion.reservations().forEach((reservation) => {

            if (reservation.id == req.query.id) {
                reservation.date = formatDateTime(reservation.date);
                reservation.hour = formatHour(reservation.date);
                reservation.conso_id = reservation.conso;
                reservation.conso = Reservation.getConso(reservation.conso);
                InfosReservation = reservation;
            };
        });

        if (InfosReservation == undefined) {
            InfosReservation = "Cette réservation n'existe pas";
        }

        Stock.conso().forEach((conso) => {
            if (conso.quantity > 0) {
                stocks.push(conso);
            }
        });

        res.render('gestion/reservation.hbs', { reservation: InfosReservation, stocks });
    } else {
        res.render('gestion/login.hbs');
    }
});

router.post('/add', (req, res) => {
    Reservation.add(req.body.id, req.body.choice, req.body.persons);

    res.redirect("/reservation?id=" + req.body.id);
});

router.post('/delete', (req, res) => {
    Reservation.delete(req.body.id, req.body.choice, req.body.persons);

    res.redirect("/reservation?id=" + req.body.id);
});

router.post('/update_infos', (req, res) => {
    req.body.payment_bcc = req.body.payment_bcc.split(",").join(".");
    req.body.payment_cash = req.body.payment_cash.split(",").join(".");

    const updated_price = price(req.body.persons, req.body.activities, req.body.nbr_laser, req.body.nbr_vr, req.body.nbr_ct, Reservation.getConso(req.body.conso), req.body.deposit, req.body.payment_bcc, req.body.payment_cash);

    if (req.session.member.is_admin) {
        Reservation.update(req.body.id, req.body.persons, formatDateTime(req.body.date), req.body.activities, updated_price.nbr_laser, updated_price.nbr_vr, updated_price.nbr_ct, req.body.deposit, req.body.payment_bcc, req.body.payment_cash, req.body.payment_by, updated_price.remaining, updated_price.total, req.body.observation);
    } else {
        Reservation.update(req.body.id, req.body.persons, formatDateTime(req.body.hour), req.body.activities, updated_price.nbr_laser, updated_price.nbr_vr, updated_price.nbr_ct, req.body.deposit, req.body.payment_bcc, req.body.payment_cash, req.body.payment_by, updated_price.remaining, updated_price.total, req.body.observation);
    }
    res.redirect("/reservation?id=" + req.body.id + "#details");
});

module.exports = router;