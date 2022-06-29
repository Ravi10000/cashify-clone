const Product = require("../models/product.model");

module.exports.index = async (req, res) => {
    try{
        const products = await Product.find({})
        res.send(products);
    }
    catch(err){
        res.send({redirectTo: '/'})
    }
  }

module.exports.fetchProductById = async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.send(product)
    } catch (error) {
        res.send({redirectTo: '/'})
    }
  }