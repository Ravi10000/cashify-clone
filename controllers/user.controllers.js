const User = require('../models/user.model')

module.exports.signUpUser = async(req, res)=>{
    try {
        const {email, password} = req.body
        const user = new User({email, mobile: req.body["phone number"], username: email})
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
        console.log(req.body)
        const {productid} = req.body
        // const {email, mobile} = req.user
        // const user = User.find({email: email, mobile: mobile})
        const user = req.user
        // const user = await User.findByIdAndUpdate(req.user._id, {...userInfo})
        // user.orders = []
        user.orders.push(productid)
        console.log(user)
        await user.save()
        res.redirect('/')
    }
    catch(err){
        console.log(err);
        res.redirect('/')
    }
}

module.exports.updateUserProfile = async(req, res)=>{
    try{
        // const userInfo = req.body
        console.log('triggered update User Profile')
        // const {name, address} = req.body
        // const user = req.user
        // user.name = name
        // user.address = address
        const userInfo = req.body
        const user = await User.findByIdAndUpdate(req.user._id, {...userInfo, mobile: req.body['phone number']})
    await user.save()
    console.log('user updated')
    res.send(user)
    }
    catch(err){
        console.log(err)

    }
}
