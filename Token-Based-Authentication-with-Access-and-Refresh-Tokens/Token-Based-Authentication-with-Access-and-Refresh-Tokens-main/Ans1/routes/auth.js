const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const { verifyRefreshToken } = require('../middleware/auth');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate tokens
        const accessToken = jwt.sign(
            { userId: user._id },
            config.JWT_ACCESS_SECRET,
            { expiresIn: config.ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            config.JWT_REFRESH_SECRET,
            { expiresIn: config.REFRESH_TOKEN_EXPIRY }
        );

        // Save refresh token to user
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Refresh token route
router.post('/token', verifyRefreshToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        
        // Generate new access token
        const accessToken = jwt.sign(
            { userId: user._id },
            config.JWT_ACCESS_SECRET,
            { expiresIn: config.ACCESS_TOKEN_EXPIRY }
        );

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 