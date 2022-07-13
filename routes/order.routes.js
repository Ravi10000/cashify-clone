const express = require('express');
const router = express.Router();
const {getOrders, getOrdersByIds, generateOrder} = require('../controllers/order.controllers')

router.get('/', getOrders)
router.post('/new', generateOrder)
router.post('/my-orders', getOrdersByIds)

module.exports = router