const Product = require('../models/product');
const Order = require('../models/order');

module.exports = {
  index: function(req, res){
    Product.find({}, function(err, products){
      if(err){
        res.json(err);
      }
      else{
        res.json(products);
      }
    });
  },

  create: function(req, res){
    Product.create(req.body, function(err){
      if(err){
        return res.json(err);
      }
      return res.json(true);
    });
  },

  delete: function(req, res){
    Order.removeOrdersByProductId(req.params.id, function(err){
      if(err){
        return res.json(err);
      }
      Product.remove({ _id: req.params.id}, function(err){
        if(err){
          return res.json(err);
        }
        return res.json(true);
      });
    });
  }
}