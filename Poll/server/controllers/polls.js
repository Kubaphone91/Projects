const mongoose = require('mongoose');
const Poll = require('../models/poll');
const Option = require('../models/option');


module.exports = {
  get(req, res) {
    Poll.find({}, (err, polls) => {
      if(err){
        console.log(err);
      }
      return res.json(polls);
    })
  },

  create(req, res) {
    var newPoll = new Poll({question: req.body.question, creator: req.body.creator});
    newPoll.save((err) => {
      if(err){
        console.log("Error saving poll", err);
      }
    });
    var newOptionOne = new Option({option: req.body.optionone, likes: 0});
    newOptionOne._poll = newPoll._id;
    newOptionOne.save((err) => {
      if(err){
        console.log("Error with option one", err);
      }
    });
    var newOptionTwo = new Option({option: req.body.optiontwo, likes: 0});
    newOptionTwo._poll = newPoll._id;
    newOptionTwo.save((err) => {
      if(err){
        console.log("Error with option two", err);
      }
    });
    var newOptionThree = new Option({option: req.body.optionthree, likes: 0});
    newOptionThree._poll = newPoll._id;
    newOptionThree.save((err) => {
      if(err){
        console.log("Error with option three", err);
      }
    });
    var newOptionFour = new Option({option: req.body.optionfour, likes: 0});
    newOptionFour._poll = newPoll._id;
    newOptionFour.save((err) => {
      if(err){
        console.log("Error with option four", err);
      }
    });
    return res.json("Poll created with options");
  },

  delete(req, res) {
    Poll.remove({_id: req.params.id}, (err) => {
      if(err){
        console.log(err);
      }
    });
    return res.json("Poll deleted");
  },

  getPoll(req, res) {
    Poll.findOne({_id: req.params.id}, (err, poll) => {
      if(err){
        console.log(err);
      }
      return res.json(poll);
    })
  },

  vote(req, res) {
    Option.update({_id: req.body._id}, {$inc: { likes: 1}}, (err) => {
      if(err){
        console.log(err);
      }
      return res.json("Vote recorded");
    })
  },

  getOption(req, res) {
    Option.findOne({_id: req.params.id} ,(err, option) => {
      if(err){
        console.log(err)
      }
      return res.json(option);
    })
  },

  getOptions(req, res) {
    Option.find({_poll: req.params.id}, (err, options) => {
      if(err){
        console.log(err);
      }
      return res.json(options);
    })
  }
}