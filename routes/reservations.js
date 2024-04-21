const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Reservation = require("../models/Reservation.js");

function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    if (date.getMinutes() < 10) {
        return `${date.getHours()}:0${date.getMinutes()}`;
    } else {
        return `${date.getHours()}:${date.getMinutes()}`;
    }
};

function price(persons, activities, nbr_laser, nbr_vr, nbr_ct, soft, aquarius, capri_sun, chips, pop_corn, bonbon, deposit, payment_bcc, payment_cash) {
    let price;

    if (activities === "Laser Game") {
        if (nbr_laser == 0) {
            nbr_laser = 1;
        }
        nbr_vr = 0;
        nbr_ct = 0;
        price = 8 * persons * nbr_laser;
    } else if (activities === "Réalité Virtuelle") {
        if (nbr_vr == 0) {
            nbr_vr = 1;
        }
        nbr_laser = 0;
        nbr_ct = 0;
        price = 10 * persons * nbr_vr
    } else if (activities === "Cyber Games") {
        if (nbr_ct == 0) {
            nbr_ct = 1;
        }
        nbr_laser = 0;
        nbr_vr = 0;
        price = 20 * persons * nbr_ct
    } else if (activities === "Anniversaire Laser Game") {
        if (nbr_laser != 3) {
            nbr_laser = 3;
        }
        nbr_vr = 0;
        nbr_ct = 0;

        if (persons <= 10) {
            price = 200;
        } else {
            price = 20 * persons;
        }
    } else if (activities === "Anniversaire Trio Pack") {
        if (nbr_laser != 1) {
            nbr_laser = 1;
        }
        if (nbr_vr != 1) {
            nbr_vr = 1;
        }
        if (nbr_ct != 1) {
            nbr_ct = 1;
        }

        if (persons <= 8) {
            price = 280;
        } else {
            price = 35 * persons;
        }
    }
    else if (activities === "Famille Trio Pack") {
        if (nbr_laser != 1) {
            nbr_laser = 1;
        }
        if (nbr_vr != 1) {
            nbr_vr = 1;
        }
        if (nbr_ct != 1) {
            nbr_ct = 1;
        }
        price = 35 * persons;
    } else if (activities === "Laser Game + Réalité Virtuelle") {
        if (nbr_laser == 0) {
            nbr_laser = 1;
        }
        if (nbr_vr == 0) {
            nbr_vr = 1;
        }
        nbr_ct = 0;

        price = ((8 * nbr_laser) + (10 * nbr_vr)) * persons;
    } else if (activities === "Laser Game + Cyber Games") {
        if (nbr_laser == 0) {
            nbr_laser = 1;
        }
        if (nbr_ct == 0) {
            nbr_ct = 1;
        }
        nbr_vr = 0;

        if (nbr_ct == 1) {
            price = ((8 * nbr_laser) + 20) * persons;
        } else if (nbr_ct == 2) {
            price = ((8 * nbr_laser) + 36) * persons;
        } else if (nbr_ct == 3) {
            price = ((8 * nbr_laser) + 51) * persons;
        } else {
            price = ((8 * nbr_laser) + 51 + (15 * (nbr_ct - 3))) * persons;
        }
    } else if (activities === "Réalité Virtuelle + Cyber Games") {
        price = 30 * persons
    } else if (activities === "Laser Game + Réalité Virtuelle + Cyber Games") {
        price = 35 * persons
    }

    const food = (soft * 2.5) + (aquarius * 3.5) + (capri_sun * 2) + (chips * 2) + (pop_corn * 3.5) + (bonbon * 3);
    const remaining = price - deposit - payment_bcc - payment_cash + food;
    const total = price + food;

    return { nbr_laser: nbr_laser, nbr_vr: nbr_vr, nbr_ct: nbr_ct, price: price, remaining: remaining, total: total};
}

router.get('/', (req, res) => {
    if (req.session.connected) {
        let InfosReservation;

        Gestion.reservations().forEach((reservation) => {

            if (reservation.id == req.query.id) {
                reservation.date = formatDate(reservation.date);
                InfosReservation = reservation;
            };
        });

        res.render('reservation.hbs', { reservation: InfosReservation });
    } else {
        res.render('login.hbs');
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

    const updated_price = price(req.body.persons, req.body.activities, req.body.nbr_laser, req.body.nbr_vr, req.body.nbr_ct, req.body.soft, req.body.aquarius, req.body.capri_sun, req.body.chips, req.body.pop_corn, req.body.bonbon, req.body.deposit, req.body.payment_bcc, req.body.payment_cash);

    Reservation.update(req.body.id, req.body.persons, req.body.activities, updated_price.nbr_laser, updated_price.nbr_vr, updated_price.nbr_ct, req.body.deposit, req.body.payment_bcc, req.body.payment_cash, req.body.payment_by, updated_price.remaining, updated_price.total, req.body.observation);
    res.redirect("/reservation?id=" + req.body.id);
});

module.exports = router;