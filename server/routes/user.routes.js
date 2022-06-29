const express = require('express');
const passport = require('passport');
const { signUpUser, signInUser, signOutUser, getUser, generateOrder } = require('../controllers/user.controllers');

const router = express.Router()

router.post('/signup', signUpUser)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin'}), signInUser)
router.post('/signout', signOutUser)
router.post('order', generateOrder)

router.get('/', getUser)

module.exports = router