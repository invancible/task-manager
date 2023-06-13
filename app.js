// Nodejs
const path = require("path");

// External dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

// Internal dependencies
require("dotenv").config();

const app = express();
const store = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});
const csrfProtection = csrf();

// Setup
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

// Routes
app.use((req, res) => {
  res.render("404");
});

// Connection
mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("Connection Success!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection Failed!");
  });
