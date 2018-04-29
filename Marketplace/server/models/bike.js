const mongoose = require('mongoose');
const { Schema } = mongoose;

const bikeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: true
});

module.exports = mongoose.model('Bike', bikeSchema);