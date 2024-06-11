const express = require('express');
const router = express.Router();

const Headset = require("../models/Headset.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        res.render("gestion/material/headsets.hbs", {headsets: Headset.list()});
    } else {
        res.render("gestion/login.hbs");
    }
});

router.post("/repaired", (req, res) => {
    Headset.repaired(req.body.id);
    res.redirect("/headsets");
});

router.post("/update", (req, res) => {
    Headset.update(req.body.id, req.body.headset_problem, req.body.joycons_problem, req.body.description);
    res.redirect("/headsets");
});

module.exports = router;