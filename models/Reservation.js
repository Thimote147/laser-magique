const db = require("./db_conf.js");

const Stock = require("../models/Stock.js");

module.exports.getConso = (id) => {
    const stmt = db.prepare("SELECT * FROM consommations WHERE id = ?").get(id);
    let consommations = [];

    for (let [conso, valeur] of Object.entries(stmt)) {
        if (conso != 'id' && valeur > 0) {
            conso = conso.slice(0, 1).toUpperCase() + conso.slice(1).split("_").join(" ");
            consommations.push({ name: conso, quantity: valeur });
        }
    }

    return consommations;
};

module.exports.add = (id, choice, persons) => {
    Stock.conso().forEach((stock) => {
        if (choice == stock.name) {
            Stock.delete(stock.name);

            let conso = db.prepare("SELECT c.* FROM consommations c, reservations r WHERE r.id = ? AND r.conso = c.id").get(id);

            choice = choice.split(" ");
            choice = choice.join("_");

            db.prepare("UPDATE consommations SET " + choice.toLowerCase() + " = ? WHERE id = ?").run(++conso[choice.toLowerCase()], conso.id);

            let stmt = db.prepare("SELECT * FROM reservations WHERE id = ?").get(id);
            const price = db.prepare("SELECT price FROM stocks WHERE name = ?").get(choice).price; 
            stmt.remaining += price;
            stmt.total += price;
            db.prepare("UPDATE reservations SET remaining = ?, total = ? WHERE id = ?").run(stmt.remaining, stmt.total, id);
        }
    });

    if (choice === "laser") {
        let stmt = db.prepare("SELECT nbr_laser, remaining, total from reservations WHERE id = ?").get(id);
        stmt.nbr_laser++;
        stmt.remaining += 8 * persons;
        stmt.total += 8 * persons;
        const info = db.prepare("UPDATE reservations SET nbr_laser = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.nbr_laser, stmt.remaining, stmt.total, id);
    } else if (choice === "vr") {
        let stmt = db.prepare("SELECT nbr_vr, remaining, total from reservations WHERE id = ?").get(id);
        stmt.nbr_vr++;
        stmt.remaining += 10 * persons;
        stmt.total += 10 * persons;
        const info = db.prepare("UPDATE reservations SET nbr_vr = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.nbr_vr, stmt.remaining, stmt.total, id);
    } else if (choice === "ct") {
        let stmt = db.prepare("SELECT nbr_ct, remaining, total from reservations WHERE id = ?").get(id);
        stmt.nbr_ct++;
        stmt.remaining += 20 * persons;
        stmt.total += 20 * persons;
        const info = db.prepare("UPDATE reservations SET nbr_ct = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.nbr_ct, stmt.remaining, stmt.total, id);
    }
}

module.exports.delete = (id, choice, persons) => {
    Stock.conso().forEach((stock) => {
        choice = choice.toLowerCase();

        if (choice == stock.name) {
            Stock.add(stock.name, 1);

            let conso = db.prepare("SELECT c.* FROM consommations c, reservations r WHERE r.id = ? AND r.conso = c.id").get(id);

            choice = choice.split(" ").join("_");

            db.prepare("UPDATE consommations SET " + choice + " = ? WHERE id = ?").run(--conso[choice], conso.id);

            let stmt = db.prepare("SELECT * FROM reservations WHERE id = ?").get(id);
            const price = db.prepare("SELECT price FROM stocks WHERE name = ?").get(choice).price;
            stmt.remaining -= price;
            stmt.total -= price;
            db.prepare("UPDATE reservations SET remaining = ?, total = ? WHERE id = ?").run(stmt.remaining, stmt.total, id);
        }
    });
    
    if (choice === "laser") {
        let stmt = db.prepare("SELECT nbr_laser, remaining, total from reservations WHERE id = ?").get(id);
        stmt.nbr_laser--;
        stmt.remaining -= 8 * persons;
        stmt.total -= 8 * persons;
        const info = db.prepare("UPDATE reservations SET nbr_laser = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.nbr_laser, stmt.remaining, stmt.total, id);
    } else if (choice === "vr") {
        let stmt = db.prepare("SELECT nbr_vr, remaining, total from reservations WHERE id = ?").get(id);
        stmt.nbr_vr--;
        stmt.remaining -= 10 * persons;
        stmt.total -= 10 * persons;
        const info = db.prepare("UPDATE reservations SET nbr_vr = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.nbr_vr, stmt.remaining, stmt.total, id);
    } else if (choice === "ct") {
        let stmt = db.prepare("SELECT nbr_ct, remaining, total from reservations WHERE id = ?").get(id);
        stmt.nbr_ct--;
        stmt.remaining -= 20 * persons;
        stmt.total -= 20 * persons;
        const info = db.prepare("UPDATE reservations SET nbr_ct = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.nbr_ct, stmt.remaining, stmt.total, id);
    }
}

module.exports.update = (id, persons, date, activities, nbr_laser, nbr_vr, nbr_ct, deposit, payment_bcc, payment_cash, payment_by, remaining, total, observation) => {
    const stmt = db.prepare("UPDATE reservations SET persons = ?, date = ?, activities = ?, nbr_laser = ?, nbr_vr = ?, nbr_ct = ?, deposit = ?, payment_bcc = ?, payment_cash = ?, payment_by = ?, remaining = ?, total = ?, observation = ? WHERE id = ?");
    const info = stmt.run(persons, date, activities, nbr_laser, nbr_vr, nbr_ct, deposit, payment_bcc, payment_cash, payment_by, remaining, total, observation, id);
};