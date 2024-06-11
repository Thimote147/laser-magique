const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("gestion/material/weapons.hbs");
});

module.exports = router;