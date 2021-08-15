const {
  Schema,
  model,
} = require('mongoose');

const options = {
  discriminatorKey: 'role',
  timestamps: true,
  virtuals: {
    toObject: true,
    toJSON: true,
  },
};

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  age: {
    type: Date,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  TermsOfServiceAndPrivacyPolicy: {
    type: Boolean,
    enum: ['true'],
    required: true,
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, options);

UserSchema.virtual('fullName').get(function getFullName() {
  return `${this.lastName} ${this.firstName} ${this.middleName || ''}`.trim();
});

const User = model('User', UserSchema);

User.User = User;

module.exports = User;
