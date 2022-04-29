// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

app.use(express.static('public'));
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

// This is for the HOME ROUTE
app.get('/', (req, res) => {
  let doc = fs.readFileSync("./html/login.html", 'utf-8');
  res.send(doc);
});

app.get('/fav', (req, res) => {
  let doc = fs.readFileSync("./html/fav.html", 'utf-8');
  res.send(doc);
});

app.get('/profileAdmin', (req, res) => {
  let doc = fs.readFileSync("./html/profileAdmin.html", 'utf-8');
  res.send(doc);
});

app.get('/profileUser', (req, res) => {
  let doc = fs.readFileSync("./html/profileUser.html", 'utf-8');
  res.send(doc);
});

app.get('/recipe', (req, res) => {
  let doc = fs.readFileSync("./html/recipe.html", 'utf-8');
  res.send(doc);
});

app.get('/mainPage', (req, res) => {
  let doc = fs.readFileSync("./html/mainPage.html", 'utf-8');
  res.send(doc);
});

app.get('/adminMain', (req, res) => {
  let doc = fs.readFileSync("./html/adminMain.html", 'utf-8');
  res.send(doc);
});

app.get('*', (rew, res) => {
  res.send('Non existing path')
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});