const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: true,
  },
  username: {
    type: String,
    minlength: 5,
    maxlength: 15,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 15,
    required: true
  },
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;