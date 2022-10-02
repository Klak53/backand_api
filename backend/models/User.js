const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, `Please provide your first name`],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, `Please provide your last name`],
    trim: true,
  },
  email: {
    type: String,
    required: [true, `Please provide your e-mail address`],
    unique: true,
    lowercase: true,
    trim: true,
    validate: (value) => {
      if (!validator.isEmail(value)) throw new Error({ error: `Invalid e-mail address` });
    },
  },
  password: {
    type: String,
    required: [true, `Please provide a password`],
    minLength: 8,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  if (this.getUpdate().password) {
    const salt = await bcrypt.genSalt();
    this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, salt);
    this.setUpdate(this.getUpdate());
  }
  next();
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
