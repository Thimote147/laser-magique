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

        res.render("calendars.hbs", { month: month[date.slice(5, 7)%12] , working: workingCalendar, notWorking: notWorkingCalendar, members: Gestion.allMembers() });
    } else {
        res.render("login.hbs");
    }
});

router.post("/add_worker", (req, res) => {
    Calendar.addWorker(req.body.worker, req.body.date);
    res.redirect("/calendars#working");
});

router.post("/add_unavailability", (req, res) => {
    if (req.body.ending_date === "") {
        Calendar.addUnavailability(req.body.worker, req.body.beginning_date, req.body.beginning_date);
    } else {
        Calendar.addUnavailability(req.body.worker, req.body.beginning_date, req.body.ending_date);
    }

    res.redirect("/calendars#unavailability");
});

router.get('/filter', (req, res) => {
    if (req.session.connected) {
        const date = new Date(req.query.month).toJSON();
        const workingCalendar = generateCalendar(date.slice(0, 4), date.slice(5, 7), 'working');
        const notWorkingCalendar = generateCalendar(date.slice(0, 4), date.slice(5, 7), 'not working');
        
        res.render("calendars.hbs", { month: month[date.slice(5, 7) % 12], working: workingCalendar, notWorking: notWorkingCalendar, members: Gestion.allMembers() });
    } else {
        res.render('login.hbs');
    }
});

module.exports = router;