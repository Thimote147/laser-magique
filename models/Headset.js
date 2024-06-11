const db = require("./db_conf.js");

module.exports.list = () => db.prepare("SELECT * FROM headsets").all();

module.exports.repaired = (id) => db.prepare("UPDATE headsets SET headset_problem = '', joycons_problem = '', description = '' WHERE id = ?").run(id);

module.exports.update = (id, headset_problem, joycons_problem, description) => db.prepare("UPDATE headsets SET headset_problem = ?, joycons_problem = ?, description = ? WHERE id = ?").run(headset_problem, joycons_problem, description, id);