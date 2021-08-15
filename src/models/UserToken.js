const {
  Schema,
  model,
} = require('mongoose');

const options = {
  timestamps: true,
};

const UserToken = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  tokenId: {
    type: String,
  },
}, options);

module.exports = model('UserToken', UserToken);
