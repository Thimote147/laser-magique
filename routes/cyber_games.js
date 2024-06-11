const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("activities/cyber_games.hbs");
});

module.exports = router;