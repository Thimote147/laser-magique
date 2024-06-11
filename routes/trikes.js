const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("gestion/material/trikes.hbs");
});

module.exports = router;