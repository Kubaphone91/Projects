const router = require('express').Router();
const bikeRoutes = require('./bike.routes');

module.exports = router
  .use('/bikes', bikeRoutes);