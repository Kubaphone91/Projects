const Order = require('../controllers/orders');
const Product = require('../controllers/products');
const Customer = require('../controllers/customers');
const path = require('path');

module.exports = function(app){
  app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });

  app.get('/orders', Order.index);
  app.get('/orders/recent', Order.recent);
  app.post('/orders/:productId/:customerId', Order.create);
  app.get('/orders/:id', Order.show);
  app.delete('/orders/:id', Order.delete);

  app.get('/products', Product.index);
  app.post('/products', Product.create);
  app.delete('/products/:id', Product.delete);

  app.get('/customers', Customer.index);
  app.get('/customers/recent', Customer.recent);
  app.post('/customers', Customer.create);
  app.delete('/customers/:id', Customer.delete);
}