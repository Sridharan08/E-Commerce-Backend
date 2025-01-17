const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add Product to Cart
exports.addToCart = async (req, res) => {
    const { customerId, productId, quantity } = req.body;

    if (!customerId || !productId || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid input.' });
    }

    try {
        const cart = await Cart.findOne({ customerId });
        if (cart) {
            const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            await cart.save();
        } else {
            await Cart.create({ customerId, products: [{ productId, quantity }] });
        }
        res.status(200).json({ message: 'Product added to cart.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Update Cart
exports.updateCart = async (req, res) => {
    const { customerId, productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ customerId });
        if (!cart) return res.status(404).json({ message: 'Cart not found.' });

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId);
        if (productIndex > -1) {
            if (quantity === 0) {
                cart.products.splice(productIndex, 1);
            } else {
                cart.products[productIndex].quantity = quantity;
            }
            await cart.save();
            res.status(200).json({ message: 'Cart updated.', cart });
        } else {
            res.status(404).json({ message: 'Product not found in cart.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Delete Product from Cart
exports.deleteFromCart = async (req, res) => {
    const { customerId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ customerId });
        if (!cart) return res.status(404).json({ message: 'Cart not found.' });

        cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
        await cart.save();
        res.status(200).json({ message: 'Product removed from cart.', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get Cart
exports.getCart = async (req, res) => {
    const { customerId } = req.params;

    try {
        const cart = await Cart.findOne({ customerId }).populate('products.productId');
        if (!cart) return res.status(404).json({ message: 'Cart is empty.' });

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};
