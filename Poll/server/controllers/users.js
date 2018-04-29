const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
  login: (req, res) => {
    User.findOne({name: req.body.name}, (err, user) => {
      if(err){
        console.log(err);
      }
      else if(user){
        req.session.user = user;
        res.json({user: user});
      }
      else{
        let user = new User(req.body);
        user.save((err) => {
          if(err){
            console.log(err);
          }
          else{
            console.log(`${ user } has been saved`);
            req.session.user = user;
            res.json({user: user});
          }
        })
      }
    })
  },

  getUser: (req, res) => {
    if(req.session.user){
      return res.json(req.session.user);
    }
    else{
      console.log("Not logged in");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    console.log("User has logged out");
  }
}