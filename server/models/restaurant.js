"use strict";
const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },

  address: {
    type: Number,
  },

  phone: {
    type: String,
  },

  openingHours: {
    sunday: {
      open: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    monday: {
      open: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    tuesday: {
      open: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    wednesday: {
      open: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    thursday: {
      open: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    friday: {
      open: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    saturday: {
      open: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
  },
});

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
