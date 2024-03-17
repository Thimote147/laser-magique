const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        res.render("gestion.hbs");
    } else {
        res.render("login.hbs");
    }
});

router.post('/auth', (req, res) => {
    if (Gestion.login(req.body.user) === req.body.password) {
        req.session.connected = true;
        req.session.member = Gestion.member(req.body.user);
        res.redirect('/gestion');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;