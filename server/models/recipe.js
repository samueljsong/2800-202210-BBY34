"use strict";
const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 20,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
