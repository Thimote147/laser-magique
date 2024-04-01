const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("trikes.hbs");
});

module.exports = router;