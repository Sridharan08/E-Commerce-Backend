const express = require('express');
const {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
} = require('../controllers/productController');

const router = express.Router();

router.post('/addproduct', addProduct);
router.put('/updateproduct/:productId', updateProduct);
router.delete('/deleteproduct/:productId', deleteProduct);
router.get('/products', getAllProducts);

module.exports = router;
