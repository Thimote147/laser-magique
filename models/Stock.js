const db  = require("./db_conf.js");

module.exports.list = () => db.prepare("SELECT * FROM stocks ORDER BY name").all();

module.exports.conso = () => {
    let stmt = db.prepare("SELECT * FROM stocks WHERE (type = 'drink' OR type = 'food') AND quantity > 0 ORDER BY type, name").all()

    stmt.forEach((conso) => {
        conso.name = conso.name.split("_");
        conso.name.forEach((word) => {
            word = word.slice(0,1).toUpperCase() + word.slice(1);
        });

        conso.name = conso.name.join(" ");
    });

    return stmt;
};

module.exports.add = (name, quantity) => {
    let db_name = name.split(" ").join("_").toLowerCase();

    const stmt = db.prepare("SELECT quantity FROM stocks WHERE name = ?").get(db_name);
    
    const result = parseInt(stmt.quantity) + parseInt(quantity);
    
    db.prepare("UPDATE stocks SET quantity = ? WHERE name = ?").run(result, db_name);
};

module.exports.delete = (name) => {
    let db_name = name.split(" ").join("_").toLowerCase();

    const stmt = db.prepare("SELECT quantity FROM stocks WHERE name = ?").get(db_name);

    const result = parseInt(stmt.quantity) - 1;

    db.prepare("UPDATE stocks SET quantity = ? WHERE name = ?").run(result, db_name);
};

module.exports.updatePrice = (name, price) => db.prepare("UPDATE stocks SET price = ? WHERE name = ?").run(price, name);