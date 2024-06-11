const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const bodyParser = require('body-parser');

/**
 * eq checks if value are equal
 */
hbs.registerHelper('eq', function (a, b) {
  if (a == b) {
    return true;
  }
  else {
    return false;
  }
});

/**
 * neq checks if value are equal
 */
hbs.registerHelper('neq', function (a, b) {
  if (a != b) {
    return true;
  }
  else {
    return false;
  }
});

const indexRouter = require("./routes/index.js");
const homeRouter = require("./routes/home.js")
const cybergamesRouter = require("./routes/cyber_games.js");
const gestionRouter = require("./routes/gestion.js");
const loginRouter = require("./routes/login.js");
const profileRouter = require("./routes/profile.js");
const weaponsRouter = require("./routes/weapons.js");
const headsetsRouter = require("./routes/headsets.js");
const trikesRouter = require("./routes/trikes.js");
const inventoryRouter = require("./routes/inventory.js");
const reservationsRouter = require("./routes/reservations.js");
const calendarRouter = require("./routes/calendars.js");
const stockRouter = require("./routes/stocks.js");
const apiRouter = require("./routes/api.js");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Setup views folder and handlebar engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev')); // Log each request
app.use(express.urlencoded({ extended: false })); // Decode form values
app.use(express.static(path.join(__dirname, 'public'))); // Get static files from public folder

app.use(session({ secret: "Your secret key", resave: false, saveUninitialized: false }));
app.use(function (req, res, next) { res.locals.session = req.session; next(); });

app.use("/", indexRouter);
app.use("/home", homeRouter);
app.use("/partie-cyber-games", cybergamesRouter);
app.use("/gestion", gestionRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/weapons", weaponsRouter);
app.use("/headsets", headsetsRouter);
app.use("/trikes", trikesRouter);
app.use("/inventory", inventoryRouter);
app.use("/reservation", reservationsRouter);
app.use("/calendars", calendarRouter);
app.use("/stocks", stockRouter);
app.use("/api", apiRouter);

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
