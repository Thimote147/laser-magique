const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const cors = require('cors');

const usersRouter = require('./routes/users');
const reservationsRouter = require('./routes/reservations');

const app = express();
const PORT = 3010;

app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' })); 

const db = new Database(path.resolve(__dirname, 'data', 'gestion.db'), {
  verbose: console.log, // Log des requêtes pour le débogage (optionnel)
});

app.use('/users', usersRouter(db));
app.use('/reservations', reservationsRouter(db));

app.listen(PORT, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${PORT}`);
});

module.exports = app;