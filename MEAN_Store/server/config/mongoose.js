const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const reg = new RegExp(".js$", "i");
const models_path = path.join(__dirname, "../models");

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/MEANstore');

fs.readdirSync(models_path).forEach(function(file){
  if(reg.test(file)){
    require(path.join(models_path, file));
  }
});