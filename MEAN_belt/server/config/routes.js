const path = require('path');
const Users = require('../controllers/users');
const Items = require('../controllers/items');

module.exports = app => {
  app.post('/api/users/login', Users.login)
  app.get('/api/users/current', Users.current)
  app.get('/api/users/logout', Users.logout)

  app.get('/api/users/all', Users.all)
  app.get('/api/users/:name', Users.details)

  app.post('/api/items/add', Items.add)
  app.post('/api/items/toggle', Items.toggle)

  app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./dist/index.html'));
  })
}