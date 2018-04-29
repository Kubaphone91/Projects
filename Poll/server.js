const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

const app = express();

//Serve with Angular
app.use(express.static(path.join(__dirname, './public/dist')));

//Parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Session config
const sessionConfig = {
  saveUninitialized: true,
  secret: 'sessionPollSecret',
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

//Port
app.listen(port, () => {
  console.log(`Listening on port ${ port }`);
})