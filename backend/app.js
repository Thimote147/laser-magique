const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const cors = require('cors');

const usersRouter = require('./routes/users.js');
const reservationsRouter = require('./routes/reservations.js');
const activitiesRouter = require('./routes/activities.js');
const foodRouter = require('./routes/food.js');

const app = express();
const PORT = 3010;

app.use(express.json());

app.use(cors({origin: "https://laser-magique.thimotefetu.fr"})); 

const db = new Database(path.resolve(__dirname, 'data', 'gestion.db'), {
  verbose: console.log,
});

app.use('/users', usersRouter(db));
app.use('/reservations', reservationsRouter(db));
app.use('/activities', activitiesRouter(db));
app.use('/food', foodRouter(db));

app.listen(PORT, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${PORT}`);
});

module.exports = app;