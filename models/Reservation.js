const db = require("./db_conf.js");

module.exports.add = (id, choice, persons) => {
    if (choice === "soft") {
        let stmt = db.prepare("SELECT soft, remaining, total from reservations WHERE id = ?").get(id);
        stmt.soft++;
        stmt.remaining += 2.5;
        stmt.total += 2.5;
        const info = db.prepare("UPDATE reservations SET soft = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.soft, stmt.remaining, stmt.total, id);
    } else if (choice === "aquarius") {
        let stmt = db.prepare("SELECT aquarius, remaining, total from reservations WHERE id = ?").get(id);
        stmt.aquarius++;
        stmt.remaining += 3.5;
        stmt.total += 3.5;
        const info = db.prepare("UPDATE reservations SET aquarius = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.aquarius, stmt.remaining, stmt.total, id);
    } else if (choice === "capri_sun") {
        let stmt = db.prepare("SELECT capri_sun, remaining, total from reservations WHERE id = ?").get(id);
        stmt.capri_sun++;
        stmt.remaining += 2;
        stmt.total += 2;
        const info = db.prepare("UPDATE reservations SET capri_sun = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.capri_sun, stmt.remaining, stmt.total, id);
    } else if (choice === "chips") {
        let stmt = db.prepare("SELECT chips, remaining, total from reservations WHERE id = ?").get(id);
        stmt.chips++;
        stmt.remaining += 2;
        stmt.total += 2;
        const info = db.prepare("UPDATE reservations SET chips = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.chips, stmt.remaining, stmt.total, id);
    } else if (choice === "pop_corn") {
        let stmt = db.prepare("SELECT pop_corn, remaining, total from reservations WHERE id = ?").get(id);
        stmt.pop_corn++;
        stmt.remaining += 3.5;
        stmt.total += 3.5;
        const info = db.prepare("UPDATE reservations SET pop_corn = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.pop_corn, stmt.remaining, stmt.total, id);
    } else if (choice === "bonbon") {
        let stmt = db.prepare("SELECT bonbon, remaining, total from reservations WHERE id = ?").get(id);
        stmt.bonbon++;
        stmt.remaining += 3;
        stmt.total += 3;
        const info = db.prepare("UPDATE reservations SET bonbon = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.bonbon, stmt.remaining, stmt.total, id);
    } else if (choice === "laser") {
        let stmt = db.prepare("SELECT nbr_laser, remaining, total from reservations WHERE id = ?").get(id);
        stmt.nbr_laser++;
        console.log(persons);
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
    if (choice === "soft") {
        let stmt = db.prepare("SELECT soft, remaining, total from reservations WHERE id = ?").get(id);
        stmt.soft--;
        stmt.remaining -= 2.5;
        stmt.total -= 2.5;
        const info = db.prepare("UPDATE reservations SET soft = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.soft, stmt.remaining, stmt.total, id);
    } else if (choice === "aquarius") {
        let stmt = db.prepare("SELECT aquarius, remaining, total from reservations WHERE id = ?").get(id);
        stmt.aquarius--;
        stmt.remaining -= 3.5;
        stmt.total -= 3.5;
        const info = db.prepare("UPDATE reservations SET aquarius = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.aquarius, stmt.remaining, stmt.total, id);
    } else if (choice === "capri_sun") {
        let stmt = db.prepare("SELECT capri_sun, remaining, total from reservations WHERE id = ?").get(id);
        stmt.capri_sun--;
        stmt.remaining -= 2;
        stmt.total -= 2;
        const info = db.prepare("UPDATE reservations SET capri_sun = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.capri_sun, stmt.remaining, stmt.total, id);
    } else if (choice === "chips") {
        let stmt = db.prepare("SELECT chips, remaining, total from reservations WHERE id = ?").get(id);
        stmt.chips--;
        stmt.remaining -= 2;
        stmt.total -= 2;
        const info = db.prepare("UPDATE reservations SET chips = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.chips, stmt.remaining, stmt.total, id);
    } else if (choice === "pop_corn") {
        let stmt = db.prepare("SELECT pop_corn, remaining, total from reservations WHERE id = ?").get(id);
        stmt.pop_corn--;
        stmt.remaining -= 3.5;
        stmt.total -= 3.5;
        const info = db.prepare("UPDATE reservations SET pop_corn = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.pop_corn, stmt.remaining, stmt.total, id);
    } else if (choice === "bonbon") {
        let stmt = db.prepare("SELECT bonbon, remaining, total from reservations WHERE id = ?").get(id);
        stmt.bonbon--;
        stmt.remaining -= 3;
        stmt.total -= 3;
        const info = db.prepare("UPDATE reservations SET bonbon = ?, remaining = ?, total = ? WHERE id = ?").run(stmt.bonbon, stmt.remaining, stmt.total, id);
    } else if (choice === "laser") {
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

module.exports.update = (id, persons, activities, nbr_laser, nbr_vr, nbr_ct, deposit, payment_bcc, payment_cash, payment_by, remaining, total, observation) => {
    const stmt = db.prepare("UPDATE reservations SET persons = ?, activities = ?, nbr_laser = ?, nbr_vr = ?, nbr_ct = ?, deposit = ?, payment_bcc = ?, payment_cash = ?, payment_by = ?, remaining = ?, total = ?, observation = ? WHERE id = ?");
    const info = stmt.run(persons, activities, nbr_laser, nbr_vr, nbr_ct, deposit, payment_bcc, payment_cash, payment_by, remaining, total, observation, id);
};