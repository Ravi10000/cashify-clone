const Product = require("../models/product.model");

module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({}).select(
      "_id brand model price quality units ram storage images"
    );
    res.send({products});
  } catch (error) {
    res.send({ error });
  }
};

module.exports.fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    await res.send(product);
  } catch (error) {
    res.redirect("/");
  }
};
