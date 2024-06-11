const express = require('express');
const router = express.Router();

const Weapon = require("../models/Weapon.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        res.render("gestion/material/weapons.hbs", {weapons: Weapon.list()});
    } else {
        res.render('gestion/login.hbs');
    }
});

router.post("/repaired", (req, res) => {
    Weapon.repaired(req.body.id);
    res.redirect("/weapons");
});

router.post('/update', (req, res) => {
    Weapon.update(req.body.id, req.body.problem, req.body.description);
    res.redirect("/weapons");
});

module.exports = router;