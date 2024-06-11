const express = require('express');
const router = express.Router();

const Stock = require("../models/Stock.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        let stocks = Stock.list();

        stocks.forEach((stock) => {
            if (stock.quantity == 0) {
                stock.quantity = "Vide";
            } else if (stock.quantity < 24) {
                stock.quantity = "Racheter";
            }
        });

        res.render('gestion/stocks.hbs', { stocks });
    } else {
        res.render('gestion/login.hbs');
    }
});

router.post("/add", (req, res) => {
    Stock.add(req.body.name, req.body.quantity);
    res.redirect("/stocks");
});

module.exports = router;