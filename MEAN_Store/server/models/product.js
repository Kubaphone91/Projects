const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  name: { type: String },
  img: { type: String },
  description: { type: String },
  quantity: { type: Number, default: 50 },
  created_at: { type: Date, default: Date.now() }
});

ProductSchema.statics.isQuantityAvailable = function(productId, quantityRequested, cb){
  this.findById(productId, function(err, product){
    if(err){
      return cb(err);
    }
    let result = (product.quantity >= quantityRequested);
    return cb(result, product);
  })
};

ProductSchema.methods.decrementQuantity = function(quantity, cb){
  this.quantity -= quantity;
  this.save(function(err){
    cb(err);
  });
};

module.exports = mongoose.model("Product", ProductSchema);