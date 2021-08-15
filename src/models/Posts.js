const {
  Schema,
  model,
} = require('mongoose');

const options = {
  timestamps: true,
};

const PostSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  whoPosted: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  }],
  admin: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, options);

module.exports = model('Posts', PostSchema);
