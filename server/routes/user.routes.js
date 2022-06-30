const express = require('express');
const passport = require('passport');
const { signUpUser, signInUser, signOutUser, getUser, generateOrder, updateUserProfile } = require('../controllers/user.controllers');
const User = require('../models/user.model')
const router = express.Router()

router.post('/signup', signUpUser)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin'}), signInUser)
router.post('/signout', signOutUser)

router.put('/generate-order', generateOrder)
router.put('/', updateUserProfile)
router.get('/', getUser)
module.exports = router