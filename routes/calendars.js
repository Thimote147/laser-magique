const express = require('express');
const router = express.Router();
const { generateCalendar } = require("./functions/function.js");
const Gestion = require("../models/Gestion.js");
const Calendar = require("../models/Calendar.js");

let month = ["Décembre", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre"];

router.get("/", (req, res) => {
    if (req.session.connected) {
        const date = new Date().toJSON();
        const workingCalendar = generateCalendar(date.slice(0, 4), date.slice(5, 7), 'working');
        const notWorkingCalendar = generateCalendar(date.slice(0, 4), date.slice(5, 7), 'not working');

        res.render("gestion/calendars.hbs", { today: date.slice(8, 10), month: month[date.slice(5, 7) % 12] + " " + date.slice(0, 4), working: workingCalendar, notWorking: notWorkingCalendar, members: Gestion.allMembers() });
    } else {
        res.render("gestion/login.hbs");
    }
});

router.post("/add_worker", (req, res) => {
    Calendar.addWorker(req.body.worker, req.body.date);
    res.redirect("/calendars#working");
});

router.post("/add_unavailability", (req, res) => {
    if (req.body.ending_date === "") {
        Calendar.addUnavailability(req.session.member.firstname, req.body.beginning_date, req.body.beginning_date);
    } else {
        Calendar.addUnavailability(req.session.member.firstname, req.body.beginning_date, req.body.ending_date);
    }

    res.redirect("/calendars#unavailability");
});

router.get('/filter', (req, res) => {
    if (req.session.connected) {
        let date;

        if (req.query.month === "") {
            date = new Date().toJSON();
        } else {
            date = new Date(req.query.month).toJSON();
            if (parseInt(date.slice(5, 7)) < 9) {
                date = date.slice(0, 5) + "0" + (parseInt(date.slice(5, 7)) + 1) + date.slice(7);
            } else {
                date = date.slice(0, 5) + (parseInt(date.slice(5, 7)) + 1) + date.slice(7);
            }
        }
        const workingCalendar = generateCalendar(date.slice(0, 4), date.slice(5, 7), 'working');
        const notWorkingCalendar = generateCalendar(date.slice(0, 4), date.slice(5, 7), 'not working');

        res.render("gestion/calendars.hbs", { month: month[date.slice(5, 7) % 12] + " " + date.slice(0, 4), working: workingCalendar, notWorking: notWorkingCalendar, members: Gestion.allMembers() });
    } else {
        res.render('gestion/login.hbs');
    }
});

module.exports = router;