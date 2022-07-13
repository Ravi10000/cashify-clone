const User = require('../models/user.model')
const Order = require('../models/order.model')

module.exports.signUpUser = async(req, res)=>{
    try {
        const {email, password, mobile} = req.body
        const user = new User({email, mobile, username: email})
        const newUser = await User.register(user, password)
        req.login(newUser, error=>{
            error ? res.send({error})
            : res.send({user: newUser})
    })
    } catch (error) {
        res.send({error})
        // res.redirect('/signup')
    }
}

module.exports.signInUser  = (req, res)=>{
    res.send({redirectUrl: '/', user: req.user})
}
module.exports.signOutUser = (req, res)=>{
    try{
        req.logout(()=>{
            res.redirect('/')
        })
    }catch(err){
        console.log(err)
        res.redirect('/signup')
    }
    // res.send(null)
}

module.exports.getUser = (req, res)=>{
    res.send(req.user)
}

module.exports.generateOrder = async(req, res)=>{
    try{ 
        const {product} = req.body
        const user = req.user
        const newOrder = await Order.create({user, product})
        user.orders.push(newOrder)
        await user.save()
        res.send(user)
    }
    catch(err){
        console.log(err);
        res.redirect('/')
    }
}

module.exports.updateUserProfile = async(req, res)=>{
    try{
        console.log(req.body)
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
    await user.save()
    console.log('user updated!', user)
    res.send(user)
    }
    catch(err){
        console.log(err)

    }
}
