const { Administrator } = require('../models');
const { generateToken } = require('../utils/jwt');

/**
 * Login administrator
 * POST /api/admin/login
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'MISSING_CREDENTIALS',
                    message: 'Username and password are required'
                }
            });
        }

        // Find administrator and verify password
        const administrator = await Administrator.findByCredentials(username, password);

        if (!administrator) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_CREDENTIALS',
                    message: 'Invalid username or password'
                }
            });
        }

        // Generate token
        const token = generateToken(administrator);

        // Set secure cookie
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        };

        res.cookie('auth_token', token, cookieOptions);

        // Return success with token
        res.json({
            success: true,
            data: {
                token,
                administrator: {
                    id: administrator.id,
                    username: administrator.username,
                    email: administrator.email
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'LOGIN_ERROR',
                message: 'An error occurred during login'
            }
        });
    }
};

/**
 * Logout administrator
 * POST /api/admin/logout
 */
const logout = async (req, res) => {
    try {
        // Clear auth cookie
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'LOGOUT_ERROR',
                message: 'An error occurred during logout'
            }
        });
    }
};

/**
 * Verify token and get current administrator
 * GET /api/admin/verify
 */
const verify = async (req, res) => {
    try {
        // Administrator is already attached by auth middleware
        res.json({
            success: true,
            data: {
                administrator: {
                    id: req.administrator.id,
                    username: req.administrator.username,
                    email: req.administrator.email
                }
            }
        });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'VERIFY_ERROR',
                message: 'An error occurred during verification'
            }
        });
    }
};

module.exports = {
    login,
    logout,
    verify
};
