const express = require('express');
const { body } = require('express-validator');
const { signup, signin } = require('../controllers/authController');

const router = express.Router();

router.post(
    '/signup',
    [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    signup
);

router.post(
    '/signin',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists(),
    ],
    signin
);

module.exports = router;
