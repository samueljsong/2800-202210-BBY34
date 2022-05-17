"use strict";
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 30,
  },

  username: {
    type: String,
    minlength: 5,
    maxlength: 20,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
  },

  picture: {
    type: String,
  },

  userType: {
    type: String,
    enum: ["User", "Admin"],
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
