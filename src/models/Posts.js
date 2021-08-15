const {
  Schema,
  model,
} = require('mongoose');

const options = {
  timestamps: true,
};

const PostSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  whoPosted: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user: {
    ref: 'User',
    type: String,
    required: true,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }],
}, options);

module.exports = model('Posts', PostSchema);
