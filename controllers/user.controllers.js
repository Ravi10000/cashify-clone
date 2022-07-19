// models
const User = require("../models/user.model");
const Order = require("../models/order.model");

// sign up user and send user to client
module.exports.signUpUser = async (req, res) => {
  try {
    const { email, password } = req.body.user;
    const user = new User({
      username: email,
      "phone number": req.body.user["phone number"],
    });
    const newUser = await User.register(user, password);
    await req.login(newUser, (error) => {
      res.send({ error });
    });
    res.send({ user: req.user });
  } catch (error) {
    res.send({ error });
  }
};

// sign in user and send user to client
module.exports.signInUser = (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    res.send({ error });
  }
};

// sign out user 
module.exports.signOutUser = (req, res) => {
  try {
    req.logout(() => {
      res.status(200).send({ message: "signed out" });
    });
  } catch (error) {
    res.send({ error });
  }
};

// fetch user from req.body and send it to client
module.exports.getUser = (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    res.send({ error });
  }
};

// 
module.exports.generateOrder = async (req, res) => {
  try {
    const { product } = req.body;
    const user = req.user;
    const newOrder = await Order.create({ user, product });
    user.orders.push(newOrder);
    await user.save();
    res.send({user});
  } catch (error) {
    res.send({ error });
  }
};

// update user info and send updated user to client
module.exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body.userUpdates,
      {
        new: true,
      }
    );
    await user.save();
    res.send({ user });
  } catch (error) {
    res.send({ error });
  }
};
