const db = require("./db_conf.js");

module.exports.list=()=> db.prepare("SELECT * FROM trikes").all();

module.exports.repaired = (id) => db.prepare("UPDATE trikes SET problem = '', description = '' WHERE id = ?").run(id);

module.exports.update = (id, problem, description) => db.prepare("UPDATE trikes SET problem = ?, description = ? WHERE id = ?").run(problem, description, id);