const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (req.session.connected) {
        res.render("gestion.hbs");
    } else {
        res.render("login.hbs");
    }
});

router.post('/auth', (req, res) => {
    if (Bcrypt.compareSync(req.body.password, Gestion.member(req.body.user).password)) {
        req.session.connected = true;
        req.session.member = Gestion.member(req.body.user);
        res.redirect('/gestion');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;