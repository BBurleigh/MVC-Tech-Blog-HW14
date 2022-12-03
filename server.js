const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// handles the cookies and session control
const sess = { 
  secret: 'Super secret secret', // package needs this exact text for the cookie to work (matching authentication)
  cookie: {
    maxAge: 300000, // will last about 5 minutes
    httpOnly: true, // limits to http (no XML or Apache)
    secure: false,
    sameSite: 'strict', // perhaps limiting the domain --> REACH handles this differently (newer version of handlebars)
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// initializing the session
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); // referring to the views folder/look here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// setting up our routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});