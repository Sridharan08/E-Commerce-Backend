const express = require('express');
const { placeOrder, getAllOrders, getOrdersByCustomerId } = require('../controllers/orderController');

const router = express.Router();

router.post('/placeorder', placeOrder);
router.get('/getallorders', getAllOrders);
router.get('/orders/customer/:customerId', getOrdersByCustomerId);

module.exports = router;
