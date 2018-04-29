const bikeController = require('../../controllers/bikes');
const router = require('express').Router();

module.exports = router
  .get('/', bikeController.index)
  .post('/', bikeController.create)
  .put('/:id', bikeController.update)
  .get('/:id', bikeController.show)
  .delete('/:id', bikeController.destroy);