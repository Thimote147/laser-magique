const express = require('express');
const router = express.Router();

const Trike = require("../models/Trike.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        res.render("gestion/material/trikes.hbs", { trikes: Trike.list() });
    } else {
        res.render("gestion/login.hbs");
    }
});

router.post("/repaired", (req, res) => {
    Trike.repaired(req.body.id);
    res.redirect("/trikes");
});

router.post("/update", (req, res) => {
    Trike.update(req.body.id, req.body.problem, req.body.description);
    res.redirect("/trikes");
});

module.exports = router;