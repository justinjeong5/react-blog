const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
})

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    // bcryptjs
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next()
      });
    });
  } else {
    next()
  }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }