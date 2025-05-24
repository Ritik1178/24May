module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-api',
    JWT_ACCESS_SECRET: 'your_access_token_secret_key_here',
    JWT_REFRESH_SECRET: 'your_refresh_token_secret_key_here',
    ACCESS_TOKEN_EXPIRY: '15m',
    REFRESH_TOKEN_EXPIRY: '7d'
}; 