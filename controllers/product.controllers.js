const Product = require("../models/product.model");

// module.exports.index = async (req, res) => {
//   try {
//     const products = await Product.find({}).select(
//       "_id brand model price quality units ram storage images"
//     );
//     res.send({products});
//   } catch (error) {
//     res.send({ error });
//   }
// };
module.exports.index = async (req, res) => {
  try {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    console.log("req.query", req.query)
    console.log({skip})
    console.log({limit})

    const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .select("_id brand model price quality units ram storage images")
    .sort({createdAt: -1})
    // for(let i = 0; i < products.length; i++){
    //   console.log('logging')
    //   console.log(i, products[i]?.createdAt?.toString())
    // }
    console.log('log something')
    if (skip) {
      res.send({ products });
      return;
    }
    const productsCount = await Product.countDocuments();
    res.send({ products, productsCount });
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
