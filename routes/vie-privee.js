const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('vie-privee.hbs');
});

module.exports = router;