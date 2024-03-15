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

module.exports.addReservation = (infos) => {
    const stmt = db.prepare("INSERT INTO reservations (firstname, lastname, email, phone_number, persons, date, activities, comments) values (?,?,?,?,?,?,?,?)");
    const info = stmt.run(infos.firstname, infos.lastname, infos.email, infos.phone_number, infos.persons, infos.date, infos.activities, infos.resComment);
};