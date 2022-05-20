const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  posted: {
    type: Date,
    default: Date.now,
    required: true,
  },

  author: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },

  picture: {
    type: String,
  },

  recipeName: {
    type: String,
    required: true,
  },

  ingredients: {
    type: String,
    required: true,
  },

  instructions: {
    type: String,
    required: true,
  },

  serving: {
    type: Number,

  },

  rating: {
    type: Number,

    min: 0,
    max: 5,
  },
}, {
  timestamps: true,
});

const Recipe2 = model("Recipe2", recipeSchema);

module.exports = Recipe2;