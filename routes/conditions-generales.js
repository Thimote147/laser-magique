const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('conditions-generales.hbs');
});

module.exports = router;