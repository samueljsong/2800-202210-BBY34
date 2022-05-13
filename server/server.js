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
const port = process.env.PORT || 8000;

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
        secret: "burnaby34",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 123456789,
            secure: false,
        },
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://PhuongNg12:WnZoeFeLbTRXEo6D@2800-bby34.to1kn.mongodb.net/2800-BBY34?retryWrites=true&w=majority",
            collectionName: "sessions",
        }),
    })
);

app.get("/api/users", async(req, res) => {
    if (req.session.isAuth) {
        try {
            const users = await User.find();
            res.send(users);
        } catch (err) {
            res.send(err);
        }
    }
});

app.post("/api/admin/signup", async(req, res) => {
    if (req.session.isAuth) {
        try {
            const currentUser = await User.findOne({ _id: req.session.userID });
            if (currentUser.userType === "User") {
                res.send("Only admin can add new users");
            }
            if (currentUser.userType === "Admin") {
                const newUser = new User(req.body);
                await newUser.save();
                res.send(`${newUser.email} created`);
            }
        } catch (err) {
            res.send(err);
        }
    }
});

app.patch("/api/user/:id", async(req, res) => {
    if (req.session.isAuth) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id },
                req.body, {
                    new: true,
                    runValidators: true,
                }
            );
            res.send(user);
        } catch (err) {
            res.send(err);
        }
    } else {
        res.redirect("/");
    }
});

app.delete("/api/user/:id", async(req, res) => {
    if (req.session.isAuth) {
        try {
            const currentUser = await User.findOne({ _id: req.session.userID });
            const targetUser = await User.findOne({ _id: req.params.id });

            if (currentUser.userType === "User") {
                if (currentUser.id === targetUser.id) {
                    const deletedUser = await User.findOneAndDelete({
                        _id: req.session.userID,
                    });
                    res.send(`${deletedUser.email} deleted`);
                } else {
                    res.send("Not Authorized");
                }
            }

            if (currentUser.userType === "Admin") {
                let adminCount = 0;
                const users = await User.find();
                users.forEach((user) => {
                    if (user.userType === "Admin") {
                        adminCount++;
                    }
                });

                if (targetUser.userType === "Admin") {
                    if (adminCount > 1) {
                        const deletedUser = await User.findOneAndDelete({
                            _id: targetUser.id,
                        });
                        res.send(`${deletedUser.email} deleted`);
                    } else {
                        res.send(
                            `Cannot delete ${targetUser.email} as they are the last admin`
                        );
                    }
                }

                if (targetUser.userType === "User") {
                    const deletedUser = await User.findOneAndDelete({
                        _id: targetUser.id,
                    });
                    res.send(`${deletedUser.email} deleted`);
                }
            }
        } catch (err) {
            res.send(err);
        }
    } else {
        res.redirect("/");
    }
});

app.post("/api/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    if (user) {
        if (password == user.password) {
            req.session.userID = user.id;
            req.session.email = user.email;
            req.session.isAuth = true;
            req.session.save();
            res.status(200).send(JSON.stringify(user.userType));
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
    } else {
        res.redirect("/");
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

app.get("/", async(req, res) => {
    if (!req.session.isAuth) {
        let doc = fs.readFileSync("../html/login.html", "utf-8");
        res.send(doc);
    } else {
        try {
            const currentUser = await User.findOne({ _id: req.session.userID });
            if (currentUser.userType === "User") {
                res.redirect("/mainPageUser");
            } else {
                res.redirect("/adminMain");
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
});

app.get("/loginErrorNoUserFound", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../xml/loginErrorNoUserFound.xml", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/adminMain", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/admin/adminMain.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/profileAdmin", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/admin/profileAdmin.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/mainPageUser", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/user/mainPageUser.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/profileUser", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/user/profileUser.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/fav2", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/fav2.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/viewRecipes", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/viewRecipes.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/recipe", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/recipe.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/recipeInput", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/recipeInput.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/viewRestaurants", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/viewRestaurants.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.get("/dashboardAdmin", (req, res) => {
    if (req.session.isAuth) {
        let doc = fs.readFileSync("../html/admin/dashboardAdmin.html", "utf-8");
        res.send(doc);
    } else {
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});