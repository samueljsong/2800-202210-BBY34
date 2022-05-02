require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 12345,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
  })
);

app.post("/api/login", async (req, res) => {});

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
