const express = require('express');

const {index, fetchProductById} = require('../controllers/product.controllers');
const router = express.Router();

router.get('/:id', fetchProductById)
router.get('/', index)
module.exports = router;