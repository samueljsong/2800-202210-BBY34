"use strict";

require("dotenv").config();
require("./db/mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const User = require("./models/user");
const fs = require("fs");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);
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

app.post("/api/login", async(req, res) => {
  console.log(req.body);
  const email = req.body.email;
  console.log(email);
  const password = req.body.password;
  console.log(password);
  const user = await User.findOne({ email: email });

  if (user) {
    if (password == user.password) {
      req.session.email = user.email;
      req.session.isAuth = true;
      req.session.save();
      res.status(200).send({ message: "login success" });
    } else {
      res.status(401).send("Login failed");
    }
  } else {
    res.status(400).send("User email not found");
  }
});

app.get("/api/logout", (req, res) => {
  if (req.session.isAuth) {
    req.session.destroy();
    res.redirect("/");
    res.send("Logged out");
  } else {
    res.send("Logout Failed");
  }
});

app.post("/api/signup", async(req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(`${user.username} created`);
  } catch (err) {
    res.status(400).send(err.toString());
  }
});

app.use(express.static("public"));
app.use("/js", express.static("../public/js"));
app.use("/css", express.static("../public/css"));
app.use("/img", express.static("../public/img"));
app.use("/favicon", express.static("../public/favicon"));

app.get("/", (req, res) => {
  let doc = fs.readFileSync("../html/login.html", "utf-8");
  res.send(doc);
});

app.get("/loginErrorNoUserFound", (req, res) => {
  let doc = fs.readFileSync("../xml/loginErrorNoUserFound.xml", "utf-8");
  res.send(doc);
});

app.get("/fav", (req, res) => {
  let doc = fs.readFileSync("../html/fav.html", "utf-8");
  res.send(doc);
});

app.get("/profileAdmin", (req, res) => {
  let doc = fs.readFileSync("../html/admin/profileAdmin.html", "utf-8");
  res.send(doc);
});

app.get("/mainPageUser", (req, res) => {
  let doc = fs.readFileSync("../html/user/mainPageUser.html", "utf-8");
  res.send(doc);
});

app.get("/profileUser", (req, res) => {
  let doc = fs.readFileSync("../html/user/profileUser.html", "utf-8");
  res.send(doc);
});

app.get("/recipe", (req, res) => {
  let doc = fs.readFileSync("../html/recipe.html", "utf-8");
  res.send(doc);
});

app.get("/viewRestaurants", (req, res) => {
  let doc = fs.readFileSync("../html/viewRestaurants.html", "utf-8");
  res.send(doc);
});

app.get("/adminMain", (req, res) => {
  let doc = fs.readFileSync("../html/admin/adminMain.html", "utf-8");
  res.send(doc);
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});