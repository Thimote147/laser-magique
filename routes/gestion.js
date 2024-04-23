const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const { formatHour, forToday, today, formatDateTime } = require("./functions/function.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        let statistiques;

        if (!today(Gestion.getLastStatistiques().date)) {
            statistiques = Gestion.createStatistiques(Gestion.getLastStatistiques().fdc_fermeture);
            statistiques = Gestion.getStatistiques(Gestion.getLastStatistiques().id);
        } else {
            statistiques = Gestion.getStatistiques(Gestion.getLastStatistiques().id);
        }
        res.render("gestion.hbs", { reservations: forToday(Gestion.reservations()), statistiques: statistiques });
    } else {
        res.render("login.hbs");
    }
});

router.post('/cancel', (req, res) => {
    if (req.body.is_canceled == 1) {
        is_canceled = 0;
    } else {
        is_canceled = 1;
    }

    Gestion.cancel(req.body.reservation, is_canceled);
    res.redirect("/gestion");
});

router.post('/delete', (req, res) => {
    Gestion.delete(req.body.reservation);
    res.redirect("/gestion");
});

router.post('/add_reservation', (req, res) => {
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

    Gestion.addReservation(req.body.firstname, req.body.lastname, req.body.email, req.body.phone_number, req.body.persons, formatDateTime(req.body.date), req.body.activities, "", nbr_laser, nbr_vr, nbr_ct, amount);
    res.redirect('/gestion');
});

router.post("/statistiques", (req, res) => {
    
    let fdc_fermeture = parseFloat(req.body.fdc_ouverture - req.body.enveloppe);

    let total_bcc = 0;
    let total_cash = 0;
    let total_boissons = 0;
    let total_snack = 0;

    const reservations = Gestion.reservations();
    reservations.forEach((reservation) => {
        if (today(reservation.date)) {
            id = reservation.id;
            fdc_fermeture += reservation.payment_cash;
            total_bcc += reservation.payment_bcc;
            total_cash += reservation.payment_cash;
            total_boissons += (reservation.soft * 2.5) + (reservation.aquarius * 3.5) + (reservation.capri_sun * 2);
            total_snack += (reservation.chips * 2) + (reservation.pop_corn * 3.5) + (reservation.bonbon * 3);
        };
    });

    fdc_fermeture = fdc_fermeture.toFixed(2);

    Gestion.updateStatistiques(Gestion.getLastStatistiques().id, fdc_fermeture, total_bcc, total_cash, total_boissons, total_snack, req.body.enveloppe);
    res.redirect("/gestion");
});

router.get("/filter", (req, res) => {
    if (req.session.connected) {
        if (req.query.firstname === '' && req.query.date === '') {
            res.render("gestion.hbs", { reservations: forToday(Gestion.reservations()) });
        } else {
            const forSelectedDay = [];
            const filteredReservations = Gestion.filter(req.query.firstname, req.query.date);

            if (filteredReservations !== undefined && filteredReservations.length === undefined) {
                filteredReservations.date = formatHour(filteredReservations.date);
                forSelectedDay.push(filteredReservations);
                res.render("gestion.hbs", { reservations: forSelectedDay });
            } else if (filteredReservations !== undefined && filteredReservations.length !== undefined && filteredReservations.length !== 0) {
                Gestion.filter(req.query.firstname, req.query.date).forEach((reservation) => {
                    reservation.date = formatHour(reservation.date);
                    forSelectedDay.push(reservation);
                });
                res.render("gestion.hbs", { reservations: forSelectedDay });
            } else {
                res.render("gestion.hbs", { reservations: [{ date: "/", firstname: "Cette réservation n'existe pas" }] });
            }
        };
    } else {
        res.render("login.hbs");
    };
});

module.exports = router;