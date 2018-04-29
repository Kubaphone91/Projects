const mongoose = require('mongoose');
const { Schema } = mongoose;

const OptionSchema = new Schema({
  option: {
    type: String,
    required: [true, "Option is required"],
    minlength: [4, "Option must have 4 characters at least"]
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  _poll: {
    type: Schema.Types.ObjectId,
    ref: 'Poll'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Option', OptionSchema);