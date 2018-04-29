const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);