const {
  Schema,
  model,
} = require('mongoose');

const options = {
  timestamps: true,
};

const CommentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  whoPosted: {
    ref: 'User',
    type: String,
  },
  postId: {
    type: String,
    required: true,
  }
}, options);

module.exports = model('Comments', CommentSchema);
