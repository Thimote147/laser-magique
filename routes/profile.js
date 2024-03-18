const express = require('express');
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (req.session.connected) {
        if (req.session.member.is_admin === 1) {
            res.render("profile.hbs", {members : Gestion.allMembers()});
        } else {
            res.render("profile.hbs");
        }
    } else {
        res.render("login.hbs");
    }
});

router.post('/manage', (req, res) => {
    if (req.body.manage_button === "modify") {
        req.session.modify = true;
        res.redirect("/profile");
    } else if (req.body.manage_button === "save") {
        Gestion.updateMember(req.body.firstname, req.body.email, req.body.phone_number, Bcrypt.hashSync(req.body.password, 10));
        req.session.modify = false;
        res.redirect("/profile");
    } else if (req.body.manage_button === "disconnect") {
        req.session.destroy();
        res.redirect('/accueil');
    }
})

module.exports = router;