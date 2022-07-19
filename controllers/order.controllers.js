const Order = require('../models/order.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')

// module.exports.getOrders = async(req, res)=>{
//     const orders = await Order.find().populate('product')
//     res.send({orders})
// }

module.exports.generateOrder = async(req, res)=>{
    try{ 
        const {id} = req.body
        const product = await Product.findById(id)
        const user = req.user
        const newOrder = await Order.create({user, product})
        user.orders.push(newOrder)
        await user.save()
        product.units -= 1 
        await product.save();
        res.send({user})
    }
    catch(error){
        console.log(error);
        res.send({error})
    }
}

module.exports.getOrdersByIds = async(req, res)=>{
    const {orderIds} = req.body
    const orders = await Order.find({_id: {$in: orderIds}}).populate('product', "_id images brand model ram storage quality color")
    res.send({orders})
}