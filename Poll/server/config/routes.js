const path = require('path');
const users = require('../controllers/users');
const polls = require('../controllers/polls');

module.exports = app => {
  //Users
  app.post('/api/users', users.login);
  app.get('/api/users/current', users.getUser);
  app.get('/api/users/logout', users.logout);

  //Polls
  app.post('/api/polls', polls.create);
  app.get('/api/polls', polls.get);
  app.delete('/api/polls/:id', polls.delete);
  app.get('/api/options/one/:id', polls.getOption);
  app.get('/api/options/:id', polls.getOptions);
  app.get('/api/polls/:id', polls.getPoll);
  app.put('/api/options', polls.vote);

  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/index.html"));
  });
}