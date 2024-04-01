const db = require("./db_conf.js");

module.exports.login = (firstname) => {
    const stmt = db.prepare("SELECT password FROM members WHERE firstname = ?");
    return stmt.get(firstname).password;
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

module.exports.addReservation = (firstname, lastname, email, phone_number, persons, date, activities, resComment, amount) => {
    const stmt = db.prepare("INSERT INTO reservations (firstname, lastname, email, phone_number, persons, date, activities, comments, deposit, payment_bcc, payment_cash, remaining, total, is_canceled) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    const info = stmt.run(firstname, lastname, email, phone_number, persons, date, activities, resComment, 0, 0, 0, amount, amount, 0);
};

module.exports.updateMember = (firstname, email, phone_number, password) => {
    const stmt = db.prepare("UPDATE members SET email = ?, phone_number = ?, password = ? WHERE firstname = ?");
    const info = stmt.run(email, phone_number, password, firstname);
};

module.exports.allMembers = () => {
    const stmt = db.prepare("SELECT firstname, lastname, email, phone_number FROM members");

    return stmt.all();
};

module.exports.findById = (id_res) => {
    const stmt = db.prepare("SELECT * FROM reservations WHERE id = ?");

    return stmt.get(id_res);
};

module.exports.updateReservation = (reservation) => {
    const stmt = db.prepare("UPDATE reservations SET persons = ?, activities = ?, deposit = ?, payment_bcc = ?, payment_cash =?, payment_by = ? WHERE id = ?");
    const info = stmt.run(reservation.persons, reservation.activities, reservation.deposit, reservation.payment_bcc, reservation.payment_cash, reservation.payment_by, reservation.id);
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

    console.log(info);

    return info;
};