const express = require('express');
const { addToCart, updateCart, deleteFromCart, getCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addToCart);
router.put('/update', updateCart);
router.delete('/delete', deleteFromCart);
router.get('/:customerId', getCart);

module.exports = router;
