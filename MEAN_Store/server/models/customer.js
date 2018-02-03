const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CustomerSchema = new Schema({
  name: { type: String },
  created_at: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Customer", CustomerSchema);