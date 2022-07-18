// process.env.NODE_ENV !== "production" 
// && require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const path = require("path");

const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");

const Product = require("./models/product.model");
const User = require("./models/user.model");

const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/cashify-clone"
const PORT = process.env.PORT || 5000;
// || "mongodb://localhost:27017/cashify-clone";
mongoose.set("debug", true);
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("connection successful");
});

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static("public"));
// app.use("/images", express.static(__dirname + "/images"));

// const sessionConfig = {
//   secret: 'idontknowanysecrets',
//   saveUninitialized: true,
//   resave: false
// }
const store = new MongoDBStore({
  uri: DB_URL,
  collection: "sessions",
});

const sessionConfig = {
  secret: "This is a secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true,
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("loading...");
  });
}

app.listen(PORT, () => {
  console.log(`listening for requests on PORT ${PORT}`);
});
