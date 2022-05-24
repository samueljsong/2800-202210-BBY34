"use strict";
const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },

  picture: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  stars: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },

  reviews: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  address: {
    type: Number,
  },

  price: {
    type: String,
  },
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
