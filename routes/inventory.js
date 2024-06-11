const express = require("express");
const router = express.Router();
const Gestion = require("../models/Gestion.js");


router.get("/", (req, res) => {
    if (req.session.connected) {
        res.render("gestion/inventory.hbs", { weapons: Gestion.weapons(), headsets: Gestion.headsets(), trikes: Gestion.trikes() });
    } else {
        res.render("gestion/login.hbs");
    };
});

module.exports = router;