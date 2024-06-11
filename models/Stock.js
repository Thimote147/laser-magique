const db  = require("./db_conf.js");

module.exports.list = () => db.prepare("SELECT * FROM stocks ORDER BY name").all();

module.exports.add = (name, quantity) => {
    const stmt = db.prepare("SELECT quantity FROM stocks WHERE name = ?").get(name);
    
    const result = stmt.quantity + quantity;
    
    db.prepare("UPDATE stocks SET quantity = ? WHERE name = ?").run(result, name);
};