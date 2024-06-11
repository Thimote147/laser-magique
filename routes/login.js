const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (req.session.connected) {
        res.render("gestion/gestion.hbs");
    } else {
        res.render("gestion/login.hbs", {error : req.session.error});
        req.session.error = null;
    };
});

router.post('/auth', (req, res) => {
    if (Gestion.member(req.body.user) !== undefined) {
        if (Bcrypt.compareSync(req.body.password, Gestion.login(req.body.user))) {
            req.session.connected = true;
            req.session.member = Gestion.member(req.body.user);
            res.redirect('/gestion');
        } else {
            req.session.error = "Mot de passe incorrect.";
            res.redirect('/login');
        }
    } else {
        req.session.error = "Prénom incorrect.";
        res.redirect("/login");
    }
});

module.exports = router;