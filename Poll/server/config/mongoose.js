const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const reg = new RegExp('\\.js$', 'i');

const modelsPath = path.join(__dirname, '../models');
const DBName = "belt-poll";

mongoose.Promise = Promise;

mongoose.connect(`mongodb://localhost/${ DBName }`);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

fs.readdirSync(modelsPath).forEach(file => {
  if(reg.test(file)){
    require(path.join(modelsPath, file));
  }
});


