const db = require("./db_conf.js");

module.exports.working = (date) => {
    return db.prepare("SELECT * FROM calendar WHERE categorie = 'working' AND strftime('%Y-%m-%d', beginning_day) = ? ORDER BY strftime('%H:%M', beginning_day)").all(date);
};

module.exports.notWorking = (date) => {
    return db.prepare("SELECT * FROM calendar WHERE categorie = 'not working' AND strftime('%Y-%m-%d', beginning_day) <= ? AND strftime('%Y-%m-%d', ending_day) >= ? ORDER BY member").all(date, date);
};

module.exports.addWorker = (worker, date) => {
    db.prepare("INSERT INTO calendar(member, beginning_day, categorie) VALUES(?,?,?)").run(worker, date, 'working');
};

module.exports.addUnavailability = (worker, beginning_date, ending_date) => {
    db.prepare("INSERT INTO calendar(member, beginning_day, ending_day, categorie) VALUES(?,?,?,?)").run(worker, beginning_date, ending_date, 'not working');
};