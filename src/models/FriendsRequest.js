const {
  Schema,
  model,
} = require('mongoose');

const options = {
  timestamps: true,
};

const RequestSchema = new Schema({
  sentBy: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
  acceptedBy: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
  isAccepted: {
    type: Boolean,
    required: true,
  }
}, options);

RequestSchema.post('save', async function postSave() {
  const User = model('User');

  if (this.isAccepted) {
    await User.updateOne({
      _id: this.acceptedBy
    }, {
      $addToSet: {
        friends: this.sentBy
      }
    }).exec();

    await User.updateOne({
      _id: this.sentBy
    }, {
      $addToSet: {
        friends: this.acceptedBy
      }
    }).exec();
  }
});

module.exports = model('RequestFriends', RequestSchema);
