const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

const app = express();

//Serve w/ Angular
app.use(express.static(path.join(__dirname, 'public', 'dist')));

//Parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Session config
const sessionConfig = {
  saveUninitialized: true,
  secret: 'sessionSecret',
  resave: false,
  name: 'session',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 360000
  }
};


app.use(session(sessionConfig));

//Data and models
require('./server/config/mongoose');

//Routes
require('./server/config/routes')(app);


//Localhost
app.listen(port, () => {
  console.log(`Listening on port ${ port }`);
})