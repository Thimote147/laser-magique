const db = require("better-sqlite3")("data/gestion.db", { verbose: console.log });

module.exports = db;