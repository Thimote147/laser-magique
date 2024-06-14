const express = require('express');
const router = express.Router();

const Stock = require("../models/Stock.js");

router.get('/', (req, res) => {
    if (req.session.connected) {
        let stocks = Stock.list();

        stocks.forEach((stock) => {
            stock.name = stock.name.slice(0, 1).toUpperCase() + stock.name.slice(1).split("_").join(" ");
        });

        res.render('gestion/stocks.hbs', { stocks });
    } else {
        res.render('gestion/login.hbs');
    }
});

router.post("/add", (req, res) => {
    let name = req.body.name.slice(0, 1).toUpperCase() + req.body.name.slice(1).split("_").join(" ");

    Stock.add(name, req.body.quantity);
    res.redirect("/stocks");
});

router.post("/update-price", (req, res) => {
    let name = req.body.name.split(" ").join("_").toLowerCase();
    let price = req.body.price.split(",").join(".");
    
    Stock.updatePrice(name, price);
    res.redirect("/stocks");
});

module.exports = router;