const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.resolve(__dirname, '../data/gestion.db'));

const initSql = fs.readFileSync(path.resolve(__dirname, '../scripts/init.sql'), 'utf8');
const statements = initSql.split(';').filter(stmt => stmt.trim());

db.exec('BEGIN TRANSACTION');

try {
  statements.forEach(statement => {
    if (statement.trim()) {
      db.exec(statement);
    }
  });
  
  // Insert initial activities
  const activities = [
    ['Laser Game Standard', 'laser-game', 8, 7, 6, 0, 2, 20],
    ['Laser Game Premium', 'laser-game', 10, 9, 8, 0, 2, 20],
    ['Virtual Reality Basic', 'virtual-reality', 15, 14, 13, 0, 1, 8],
    ['Virtual Reality Pro', 'virtual-reality', 20, 18, 16, 0, 1, 8],
    ['Cyber Trike Solo', 'cyber-trike', 12, 11, 10, 0, 1, 4],
    ['Cyber Trike Team', 'cyber-trike', 15, 14, 13, 0, 2, 8]
  ];

  const stmt = db.prepare(`
    INSERT INTO activities (name, type, first_price, second_price, third_price, is_social_deal, min_player, max_player)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  activities.forEach(activity => stmt.run(activity));

  db.exec('COMMIT');
  console.log('Database initialized successfully');
} catch (error) {
  db.exec('ROLLBACK');
  console.error('Error initializing database:', error);
  process.exit(1);
}