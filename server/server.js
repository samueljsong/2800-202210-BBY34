require("dotenv").config();
require("./db/mongoose");

const User = require("./models/user");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {});

const port = process.env.PORT || 8000;

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
