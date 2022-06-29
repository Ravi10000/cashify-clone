module.exports.isLoggedIn = (req, res, next)=>{
    req.isAuthenticated() ? next() : res.redirect('/signin')
}