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

module.exports.addReservation = (infos) => {
    const stmt = db.prepare("INSERT INTO reservations (firstname, lastname, email, phone_number, persons, date, activities, comments) values (?,?,?,?,?,?,?,?)");
    const info = stmt.run(infos.firstname, infos.lastname, infos.email, infos.phone_number, infos.persons, infos.date, infos.activities, infos.resComment);
};

module.exports.update_member = (member) => {
    const stmt = db.prepare("UPDATE members SET email = ?, phone_number = ?, password = ? WHERE firstname = ?");
    const info = stmt.run(member.email, member.phone_number, member.password, member.firstname);
};

module.exports.all_members = () => {
    const stmt = db.prepare("SELECT firstname, lastname, email, phone_number FROM members");

    return stmt.all();
};