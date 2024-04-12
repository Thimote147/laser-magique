const e = require("express");
const db = require("./db_conf.js");
const bcrypt = require("bcrypt");

module.exports.login = (firstname) => {
    const stmt = db.prepare("SELECT password FROM members WHERE firstname = ?");
    return stmt.get(firstname);
};

module.exports.weapons = () => {
    const stmt = db.prepare("SELECT * FROM weapons");
    return stmt.all();
};

module.exports.headsets = () => {
    const stmt = db.prepare("SELECT * FROM headsets");
    return stmt.all();
};

module.exports.trikes = () => {
    const stmt = db.prepare("SELECT * FROM trikes");
    return stmt.all();
};

module.exports.reservations = () => {
    const stmt = db.prepare("SELECT * FROM reservations ORDER BY date");
    return stmt.all()
};

module.exports.member = (firstname) => {
    const stmt = db.prepare("SELECT * FROM members WHERE firstname = ?");
    return stmt.get(firstname);
};

module.exports.addReservation = (firstname, lastname, email, phone_number, persons, date, activities, resComment, nbr_laser, nbr_vr, nbr_ct, amount) => {
    const stmt = db.prepare("INSERT INTO reservations (firstname, lastname, email, phone_number, persons, date, activities, comments, nbr_laser, nbr_vr, nbr_ct, soft, aquarius, capri_sun, chips, pop_corn, bonbon, deposit, payment_bcc, payment_cash, remaining, total, is_canceled) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    const info = stmt.run(firstname, lastname, email, phone_number, persons, date, activities, resComment, nbr_laser, nbr_vr, nbr_ct, 0, 0, 0, 0, 0, 0, 0, 0, 0, amount, amount, 0);
};

module.exports.updateMember = (firstname, email, phone_number, password) => {
    const stmt = db.prepare("UPDATE members SET email = ?, phone_number = ?, password = ? WHERE firstname = ?");
    const info = stmt.run(email, phone_number, password, firstname);
};

module.exports.allMembers = () => {
    const stmt = db.prepare("SELECT id, firstname, lastname, email, phone_number FROM members");

    return stmt.all();
};

module.exports.findById = (id_res) => {
    const stmt = db.prepare("SELECT * FROM reservations WHERE id = ?");

    return stmt.get(id_res);
};

module.exports.updateReservation = (id, persons, activities, nbr_laser, nbr_vr, nbr_ct, soft, aquarius, capri_sun, chips, pop_corn, bonbon, deposit, payment_bcc, payment_cash, payment_by, remaining, total, observation) => {
    const stmt = db.prepare("UPDATE reservations SET persons = ?, activities = ?, nbr_laser = ?, nbr_vr = ?, nbr_ct = ?, soft = ?, aquarius = ?, capri_sun = ?, chips = ?, pop_corn = ?, bonbon = ?, deposit = ?, payment_bcc = ?, payment_cash = ?, payment_by = ?, remaining = ?, total = ?, observation = ? WHERE id = ?");
    const info = stmt.run(persons, activities, nbr_laser, nbr_vr, nbr_ct, soft, aquarius, capri_sun, chips, pop_corn, bonbon, deposit, payment_bcc, payment_cash, payment_by, remaining, total, observation, id);
};

module.exports.cancel = (id) => {
    const stmt = db.prepare("UPDATE reservations SET is_canceled = 1 WHERE id = ?");
    const info = stmt.run(id);
}

module.exports.delete = (id) => {
    const stmt = db.prepare("DELETE FROM reservations WHERE id = ?");
    const info = stmt.run(id);
}

module.exports.photos = (start, end) => {
    const stmt = db.prepare("SELECT directory FROM photos WHERE id >= ? AND id <= ?");
    const info = stmt.run(start, end);

    return info;
};

module.exports.createStatistiques = (fdc_ouverture) => {
    const stmt = db.prepare("INSERT INTO statistiques (date, fdc_ouverture, fdc_fermeture, total_bcc, total_cash, total_boissons, total_snack, enveloppe) VALUES (?,?,?,?,?,?,?,?)");
    const info = stmt.run(new Date().toISOString().slice(0, 10), fdc_ouverture, fdc_ouverture, 0, 0, 0, 0, 0);
};

module.exports.getLastStatistiques = () => {
    const stmt = db.prepare("SELECT * FROM statistiques WHERE id = (SELECT MAX(id) FROM statistiques)");
    const info = stmt.get();

    if (!info) return { date: null, fdc_fermeture: 0 };

    return info;
};

module.exports.getStatistiques = (id) => {
    const stmt = db.prepare("SELECT * FROM statistiques WHERE id = ?");
    const info = stmt.get(id);

    return info;
};

module.exports.updateStatistiques = (fdc_fermeture, total_bcc, total_cash, total_boissons, total_snack, enveloppe) => {
    const stmt = db.prepare("UPDATE statistiques SET fdc_fermeture = ?, total_bcc = ?, total_cash = ?, total_boissons = ?, total_snack = ?, enveloppe = ?");
    const info = stmt.run(fdc_fermeture, total_bcc, total_cash, total_boissons, total_snack, enveloppe);
};

module.exports.getHours = (id_member) => {
    const stmt = db.prepare("SELECT * from hours_member WHERE id_member = ? ORDER by day, beginning_hour");
    const info = stmt.all(id_member);

    return info;
};

module.exports.addHours = (id_member, day, beginning_hour, ending_hour) => {
    const stmt = db.prepare("INSERT INTO hours_member (id_member, day, beginning_hour, ending_hour, hours, money) VALUES (?,?,?,?,?,?)");
    const info = stmt.run(id_member, day, beginning_hour, ending_hour, "0h00", 0.00);
};

module.exports.updateHours = (id, ending_hour, salary) => {
    const stmt = db.prepare("UPDATE hours_member SET ending_hour = ?, hours = ?, money = ? WHERE id = ?");
    const info = stmt.run(ending_hour, difference, salary, id);
};

module.exports.deleteHours = (id) => {
    const stmt = db.prepare("DELETE FROM hours_member WHERE id = ?");
    const info = stmt.run(id);
};

module.exports.deleteMember = (id) => {
    const stmt = db.prepare("DELETE FROM members WHERE id = ?");
    const info = stmt.run(id);
};

module.exports.addMember = (firstname, lastname) => {
    const stmt = db.prepare("INSERT INTO members (firstname, lastname, email, phone_number, is_admin, password) VALUES (?,?,?,?,?,?)");
    const info = stmt.run(firstname, lastname, "", "", 0, bcrypt.hashSync(firstname.charAt(0).toLowerCase(), 10));
};

module.exports.filter = (firstname, date) => {
    if (firstname === '') {
        const stmt = db.prepare("SELECT * FROM reservations WHERE date = ?");
        const info = stmt.all(date);

        console.log(info);

        return info;
    } else if (date === '') {
        const stmt = db.prepare("SELECT * FROM reservations WHERE firstname = ?");
        const info = stmt.all(firstname);

        console.log(info);

        return info;
    } else {
        const stmt = db.prepare("SELECT * FROM reservations WHERE firstname = ? AND date = ?");
        const info = stmt.get(firstname, date);

        console.log(info);

        return info;
    };
};