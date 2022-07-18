const User = require("../models/user.model");
const Order = require("../models/order.model");

module.exports.signUpUser = async (req, res) => {
  try {
  const { email, password } = req.body.user;
  const user = new User({
    username: email,
    "phone number": req.body.user["phone number"],
  });
  const newUser = await User.register(user, password);
  await req.login(newUser, (err)=>{
    res.send(err)
  });
  res.send({user: req.user})
  }
  catch (error) {
    res.send({ error });
  }
};

module.exports.signInUser = (req, res) => {
  res.send({ user: req.user });
};
module.exports.signOutUser = (req, res) => {
  try {
    req.logout(() => {
      res.status(200).send({ message: "signed out" });
    });
  } catch (err) {
    res.send({error})
  }
  // res.send(null)
};

module.exports.getUser = (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    res.send({error})
  }
};

module.exports.generateOrder = async (req, res) => {
  try {
    const { product } = req.body;
    const user = req.user;
    const newOrder = await Order.create({ user, product });
    user.orders.push(newOrder);
    await user.save();
    res.send(user);
  } catch (error) {
    res.send({error})
  }
};

module.exports.updateUserProfile = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.user._id, req.body.userUpdates, {
      new: true,
    });
    await user.save();
    console.log("user updated!", user);
    res.send({ user });
  } catch (error) {
    res.send({error})
  }
};
