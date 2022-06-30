// process.env.NODE_ENV === 'development' && 
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')

const Product = require("./models/product.model");
const User = require('./models/user.model')

const app = express();
const DB_URL = process.env.DB_URL 
// || "mongodb://localhost:27017/cashify-clone";

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("connection successful");
});

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static(__dirname + "/images"));

// const sessionConfig = {
//   secret: 'idontknowanysecrets',
//   saveUninitialized: true,
//   resave: false
// }
const store = new MongoDBStore({
  uri: DB_URL,
  // 'mongodb://localhost:27017/cashify-clone',
  collection: 'sessions'
});

const sessionConfig = {
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}

app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use('/api/user', userRoutes)
app.use("/api/products", productRoutes);


app.listen(5000, () => {
  console.log("listening for requests on port 5000");
});
