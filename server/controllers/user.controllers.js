const User = require('../models/user.model')

module.exports.signUpUser = async(req, res)=>{
    try {
        const {email, password, phone} = req.body
        const user = new User({email, mobile: phone, username: email})
        const newUser = await User.register(user, password)
        req.login(newUser, err=>{
            err ? console.log(err)
            : res.redirect('/')
    })
    } catch (error) {
        console.log(error)
        res.redirect('/signup')
    }
}

module.exports.signInUser  = (req, res)=>{
    res.redirect('/')
}
module.exports.signOutUser = (req, res)=>{
    req.logout(()=>{
        res.redirect('/')
    })
    // res.send(null)
}

module.exports.getUser = (req, res)=>{
    res.send(req.user)
}

module.exports.generateOrder = async(req, res)=>{
    try{
        // const {order} = req.body
        const user = req.user
        console.log(user)
        // user.orders.push(order)
        // await user.save()
        // res.redirect('/')
    }
}