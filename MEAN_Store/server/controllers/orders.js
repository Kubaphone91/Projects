const Order = require('../models/order');
const Product = require('../models/product');

module.exports = {
  index: function(req, res){
    Order.find({})
    .populate('_customer _product')
    .exec(function(err, orders){
      if(err){
        res.json(false);
      }
      else{
        res.json(orders);
      }
    });
  },

  create: function(req, res){
    let quantity = req.body.quantity;
    let _customer = req.params.customerId;
    let _product = req.params.productId;

    if(quantity < 1){
      return res.json(false);
    }

    Product.isQuantityAvailable(_product, quantity, function(result, product){
      if(result){
        product.decrementQuantity(quantity, function(err){
          if(err){
            return res.json(err);
          }
          Order.create({ quantity: quantity, _customer: customer, _product: product}, function(err){
            if(err){
              return res.json(err);
            }
            return res.json(true);
          })
        })
      }
      else{
        return res.json(false);
      }
    })
  },

  show: function(req, res){
    Order.findById(req.params.id, function(err, friend){
      if(err){
        res.json(err);
      }
      else{
        res.json(friend);
      }
    })
  },

  delete: function(req, res){
    Order.remove({ _id: req.params.id}, function(err){
      if(err){
        res.json(err);
      }
      else{
        res.json(true);
      }
    });
  },

  recent: function(req, res){
    Order.find({}).sort('-created_at').limit(3).populate('_customer _product').exec(function(err, results){
      res.json(results);
    })
  }
}