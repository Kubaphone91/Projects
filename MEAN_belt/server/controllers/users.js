const mongoose = require('mongoose');
const User = require('../models/user');
const Item = require('../models/item');

module.exports = {
  login: (req, res) => {
    User.findOne({name: req.body.name}, (err, user) => {
      if(err){
        console.log(err);
      }
      else{
        if(user){
          console.log('User found');
          req.session.name = user.name;
          res.json(true);
        }
        else{
          let newUser = new User({name: req.body.name});
          newUser.save((err, savedUser) => {
            if(err){
              console.log(err);
              let errObj = {};
              if(err.errors.name){
                errObj.name = err.errors.name.message;
              }
              res.json(errObj);
            }
            else{
              console.log('New user added');
              req.session.name = savedUser.name;
              res.json(true);
            }
          })
        }
      }
    })
  },

  current: (req, res) => {
    User.findOne({name: req.session.name}).populate('items items._creator').exec((err, user) => {
      if(err){
        console.log(err);
      }
      else{
        res.json(user);
      }
    })
  },

  logout: (req, res) => {
    delete req.session.name;
    res.json(true);
  },

  all: (req, res) => {
    User.find({}, (err, users) => {
      if(err){
        console.log(err);
      }
      else{
        res.json(users);
      }
    })
  },

  details: (req, res) => {
    User.findOne({name: req.params.name}).populate('items').exec((err,user) => {
      if(err){
        console.log(err);
      }
      else{
        res.json(user);
      }
    })
  }
}