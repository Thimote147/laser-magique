const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");


router.get("/", (req, res) => {
    if (req.session.connected) {
        res.render("inventory.hbs", { weapons: Gestion.weapons(), headsets: Gestion.headsets(), trikes: Gestion.trikes() });
    } else {
        res.render("login.hbs");
    };
});

module.exports = router;