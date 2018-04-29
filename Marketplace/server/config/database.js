const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const reg = new RegExp('\\.js$');

const modelsPath = path.join(__dirname, '../models');

mongoose.connect('mongodb://localhost/marketplace');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.Promise = global.Promise;

fs.readdirSync(modelsPath).forEach(file => {
  if(reg.test(file)){
    require(path.join(modelsPath, file));
  }
})