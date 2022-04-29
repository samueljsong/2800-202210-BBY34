const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  username: {
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 20,
    required: true,
  },

  //Type?
  type: String,
});

const User = model("User", userSchema);

module.exports = User;