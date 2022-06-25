const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Product = require("./models/product.model");

const app = express();
const dbUrl = "mongodb://localhost:27017/cashify-clone";

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("connection successful");
});

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static(__dirname + "/images"));

app.get("/api/products", async (req, res) => {
  const products = await Product.find({})
  // .select(['brand', 'model', 'price', 'imageUrl', 'quality', 'ram', 'storage']);
  res.send(products);
});

app.get('/api/product/:id', async(req, res)=>{
  console.log(req.params)
  // const product = await Product.findById(req.params)
})

app.listen(5000, () => {
  console.log("listening for requests on port 5000");
});
