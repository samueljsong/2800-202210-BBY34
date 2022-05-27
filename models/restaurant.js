"use strict";
const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
  restaurantName: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
  },

  description: {
    type: String,
  },

  address: {
    type: String,
  },

  phone: {
    type: String,
  },

  openingHours: {
    sunday: {
      type: String,
    },
    monday: {
      type: String,
    },
    tuesday: {
      type: String,
    },
    wednesday: {
      type: String,
    },
    thursday: {
      type: String,
    },
    friday: {
      type: String,
    },
    saturday: {
      type: String,
    },
  },
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
