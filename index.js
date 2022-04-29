// REQUIRES
const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

// This is for the HOME ROUTE
app.get('/', (req, res) => {
  let doc = fs.readFileSync("./html/login.html", 'utf-8');
  res.send(doc);
})

app.use((req, res) => {
  console.log("We got a new request");
  res.send('<h1>This is my webpage!');
});

app.get('*', (rew, res) => {
  res.send('Non existing path')
})

app.listen(8000, () => {
  console.log("Listening on port 8000");
});