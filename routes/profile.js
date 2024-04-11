const express = require('express');
const router = express.Router();
const Gestion = require("../models/Gestion.js");
const Bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    if (req.session.connected) {
        if (req.session.member.is_admin === 1) {
            res.render("profile.hbs", { members: Gestion.allMembers() });
        } else {
            let formatDay = Gestion.getHours(req.session.member.id);
            
            formatDay.forEach((hour) => {
                hour.day = new Date(hour.day).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "numeric" });
                hour.day = hour.day.charAt(0).toUpperCase() + hour.day.slice(1)
            });

            res.render("profile.hbs", { hours: formatDay });
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
});

router.post("/add_hours", (req, res) => {
    Gestion.addHours(req.session.member.id, new Date().toISOString().split('T')[0], req.body.beginning_hour, req.body.beginning_hour);
    res.redirect("/profile");
});

router.post("/update_hours", (req, res) => {
    Gestion.updateHours(req.body.id, req.body.beginning_hour, req.body.ending_hour);
    res.redirect("/profile");
});

router.post("/delete_hours", (req, res) => {
    Gestion.deleteHours(req.body.id);
    res.redirect("/profile");
});

module.exports = router;