const Product = require('../models/Product');

// Add Product
exports.addProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const product = new Product({ name, description, price, category });
        await product.save();
        res.status(201).json({ message: 'Product added successfully.', id: product._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const updates = req.body;

    try {
        const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product updated successfully.', product });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products.length) {
            return res.status(404).json({ message: 'No products found.' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};
