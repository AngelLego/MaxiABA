const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');

// Login (with rate limiting)
router.post('/login', loginLimiter, authController.login);

// Logout (requires authentication)
router.post('/logout', authenticate, authController.logout);

// Verify token (requires authentication)
router.get('/verify', authenticate, authController.verify);

module.exports = router;
