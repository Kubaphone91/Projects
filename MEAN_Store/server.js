const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname, + '/client'));
app.use(express.static(__dirname + '/bower_components'));

app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

require('./server/config/routes.js')(app);
require('./server/config/mongoose.js');

const connection = app.listen(port, () => {
  console.log(`Listening on ${ port }`);
});