const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const verifyAccessToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        
        try {
            const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    message: 'Access token expired',
                    code: 'TOKEN_EXPIRED'
                });
            }
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        next(error);
    }
};

const verifyRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        try {
            const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
            const user = await User.findById(decoded.userId);

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(401).json({ message: 'Invalid refresh token' });
            }

            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}; 