const db = require("./db_conf.js");

module.exports.list = () => db.prepare("SELECT * FROM weapons").all();

module.exports.repaired = (id) => db.prepare("UPDATE weapons SET problem = '', description = '' WHERE id = ?").run(id);

module.exports.update = (id, problem, descritpion) => db.prepare("UPDATE weapons SET problem = ?, description = ? WHERE id = ?").run(problem, descritpion, id);