const mongoose = require('mongoose');
const { Schema } = mongoose;

const PollSchema = new Schema({
  question: {
    type: String,
    minlength: [8, "Enter a question with 8 characters"],
    required: [true, "Question required"]
  },
  creator: {
    type: String,
    required: [true, "Creator of poll required"]
  },
  _options: [{
    type: Schema.Types.ObjectId,
    ref: 'Option'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Poll', PollSchema);