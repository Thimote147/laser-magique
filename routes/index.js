const express = require("express");
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (req.session.connected) {
    res.render('gestion/gestion.hbs');
  } else {
    res.render('gestion/login.hbs');
  }
});

module.exports = router;