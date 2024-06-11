const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("gestion/material/headsets.hbs");
});

module.exports = router;