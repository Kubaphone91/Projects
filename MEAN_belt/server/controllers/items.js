const mongoose = require('mongoose');
const User = require('../models/user');
const Item = require('../models/item');

module.exports = {
  add: (req, res) => {
    User.findOne({name: req.body.creatorName}, (err, currentUser) => {
      if(err){
        console.log(err);
      }
      else{
        let newItem = new Item({
          title: req.body.newItem.title,
          description: req.body.newItem.desc,
          creator: currentUser.name
        });
        newItem._creator = currentUser._id;
        newItem.save((err, savedItem) => {
          if(err){
            console.log(err);
            let errObj = {};
            if(err.errors.title){
              errObj.title = err.errors.title.message;
            }
            if(err.errors.description){
              errObj.description = err.errors.description.message;
            }
            res.json(errObj);
          }
          else{
            currentUser.items.push(savedItem);
            currentUser.save(err => {
              if(err){
                console.log(err);
              }
              else{
                User.findOne({name: req.body.newItem.tag}, (err,taggedUser) => {
                  if(taggedUser == null){
                    res.json(true);
                  }
                  else{
                    taggedUser.items.push(savedItem);
                    taggedUser.save(err => {
                      if(err){
                        console.log(err);
                      }
                      else{
                        res.json(true);
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  toggle: (req, res) => {
    Item.findOne({_id: req.body.id}, (err, item) => {
      if(err){
        console.log(err);
      }
      else{
        item.complete = !item.complete;
        item.save(err => {
          if(err){
            console.log(err);
          }
          else{
            res.json(true);
          }
        })
      }
    })
  }
}