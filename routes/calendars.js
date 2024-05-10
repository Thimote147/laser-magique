const express = require('express');
const router = express.Router();
const { generateCalendar } = require("./functions/function.js");
const Gestion = require("../models/Gestion.js");
const Calendar = require("../models/Calendar.js");

router.get("/", (req, res) => {
    if (req.session.connected) {
        const date = new Date().toJSON();
        const workingCalendar = generateCalendar(date.slice(0, 4), date.slice(5, 7), 'working');
        const notWorkingCalendar = generateCalendar(date.slice(0, 4), date.slice(5, 7), 'not working');
        res.render("calendars.hbs", { working: workingCalendar, notWorking: notWorkingCalendar, members: Gestion.allMembers() });
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

module.exports = router;