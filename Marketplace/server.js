const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

const sessionConfig = {
  saveUninitialized: true,
  secret: 'sessionSecret',
  resave: false,
  name: 'market-session',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 360000
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './Market/dist')));
app.use(cookieParser('cookieSecret'));
app.use(session(sessionConfig));

require('./server/config/database');

app.use('/api', require('./server/config/routes'));
app.use('/auth', require('./server/config/routes/auth.routes'));

app.use(require('./server/config/routes/catchall-routes'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});