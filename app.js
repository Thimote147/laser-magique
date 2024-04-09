const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');

/**
 * eq checks if value are equal
 */
hbs.registerHelper('eq', function (a, b) {
  if (a === b) {
    return true;
  }
  else {
    return false;
  }
});

// TODO Require your controllers here
const indexRouter = require("./routes/index.js");
const homeRouter = require("./routes/home.js")
const cybergamesRouter = require("./routes/cyber_games.js");
const gestionRouter = require("./routes/gestion.js");
const loginRouter = require("./routes/login.js");
const profileRouter = require("./routes/profile.js");
const reservationRouter = require("./routes/reservation.js");
const weaponsRouter = require("./routes/weapons.js");
const headsetsRouter = require("./routes/headsets.js");
const trikesRouter = require("./routes/trikes.js");

const app = express();
const port = 3000;

// Setup views folder and handlebar engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); // Log each request
app.use(express.urlencoded({ extended: false })); // Decode form values
app.use(express.static(path.join(__dirname, 'public'))); // Get static files from public folder

app.use(session({ secret: "Your secret key", resave: false, saveUninitialized: false }));
app.use(function (req, res, next) { res.locals.session = req.session; next(); });

// TODO Call your controllers here
app.use("/", indexRouter);
app.use("/accueil", homeRouter);
app.use("/partie-cyber-games", cybergamesRouter);
app.use("/gestion", gestionRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/reservation", reservationRouter);
app.use("/weapons", weaponsRouter);
app.use("/headsets", headsetsRouter);
app.use("/trikes", trikesRouter);

// Create error on page not found
app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + '/views/404.html');
});

// Show error hbs page
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

// Launch server
app.listen(port, () => console.log('App listening on port ' + port));
