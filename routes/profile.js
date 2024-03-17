const express = require('express');
const router = express.Router();
const Gestion = require("../models/Gestion.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        if (req.session.member.is_admin === 1) {
            console.log(Gestion.all_members());
            res.render("profile.hbs", {members : Gestion.all_members()});
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
        console.log(req.body);
        Gestion.update_member(req.body);
        req.session.modify = false;
        res.redirect("/profile");
    } else if (req.body.manage_button === "disconnect") {
        req.session.destroy();
        res.redirect('/accueil');
    }
})

module.exports = router;