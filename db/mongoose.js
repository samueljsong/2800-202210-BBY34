"use strict";
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://PhuongNg12:WnZoeFeLbTRXEo6D@2800-bby34.to1kn.mongodb.net/2800-BBY34?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => console.log(err));
