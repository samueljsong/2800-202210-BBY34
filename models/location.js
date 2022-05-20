"use strict";
const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 20,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  phoneNumber: {
    type: Number,
    min: 10,
    max: 10,
  },
});

const Location = model("Location", locationSchema);

module.exports = Location;
