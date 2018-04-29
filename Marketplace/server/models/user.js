const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const mongoose = require('mongoose');
const { Schema } = mongoose;

var BikeSchema = require('./bike.js').schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(value){
        return validator.isEmail(value);
      }
    },
    unique: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  bikesPosted: [BikeSchema]
},{
  timestamps: true
});

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique"});

userSchema.statics.validatePassword = function(candidatePassword, hashedPassword){
  return bcrypt.compare(candidatePassword, hashedPassword);
}

userSchema.pre('save', function(next){
  if(!this.isModified('password')){
    return next();
  }

  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      nect();
    })
    .catch(next);
});

module.exports = mongoose.model('User', userSchema);