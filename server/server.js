require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const session = require("express-session");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/api/login", (req, res) => {});

app.post("/api/logout", (req, res) => {});

app.post("/api/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(`${user.username} created`);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
