const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  type: String,
});

const User = model("User", userSchema);

module.exports = User;
