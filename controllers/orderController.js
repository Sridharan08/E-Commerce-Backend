const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Place Order
exports.placeOrder = async (req, res) => {
    const { customerId, shippingAddress } = req.body;

    if (!customerId || !shippingAddress) {
        return res.status(400).json({ message: 'Customer ID and shipping address are required.' });
    }

    try {
        const cart = await Cart.findOne({ customerId }).populate('products.productId');
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty.' });
        }

        // Calculate total amount
        let totalAmount = 0;
        cart.products.forEach((item) => {
            totalAmount += item.productId.price * item.quantity;
        });

        // Create Order
        const order = new Order({
            customerId,
            products: cart.products.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
            })),
            totalAmount,
            shippingAddress,
        });

        await order.save();

        // Clear the cart
        cart.products = [];
        await cart.save();

        res.status(201).json({
            message: 'Order placed successfully.',
            orderId: order._id,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get All Orders (Admin View)
exports.getAllOrders = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const orders = await Order.find()
            .populate('customerId', 'name email')
            .populate('products.productId', 'name price')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalOrders = await Order.countDocuments();
        res.status(200).json({
            totalOrders,
            page,
            totalPages: Math.ceil(totalOrders / limit),
            orders,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get Orders by Customer ID
exports.getOrdersByCustomerId = async (req, res) => {
    const { customerId } = req.params;

    try {
        const orders = await Order.find({ customerId })
            .populate('products.productId', 'name price')
            .sort({ createdAt: -1 });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this customer.' });
        }

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};
