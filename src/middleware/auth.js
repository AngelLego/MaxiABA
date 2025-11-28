const { verifyToken } = require('../utils/jwt');
const { Administrator } = require('../models');

/**
 * Authentication middleware
 * Verifies JWT token and attaches administrator to request
 */
const authenticate = async (req, res, next) => {
    try {
        // Get token from Authorization header or cookie
        let token = null;

        // Check Authorization header (Bearer token)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        // Check cookie if no header token
        if (!token && req.cookies && req.cookies.auth_token) {
            token = req.cookies.auth_token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'UNAUTHORIZED',
                    message: 'Authentication required'
                }
            });
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'INVALID_TOKEN',
                    message: 'Invalid or expired token'
                }
            });
        }

        // Get administrator from database
        const administrator = await Administrator.findByPk(decoded.id, {
            attributes: { exclude: ['password_hash'] }
        });

        if (!administrator) {
            return res.status(401).json({
                success: false,
                error: {
                    code: 'USER_NOT_FOUND',
                    message: 'Administrator not found'
                }
            });
        }

        // Attach administrator to request
        req.administrator = administrator;
        req.token = token;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: 'AUTH_ERROR',
                message: 'Authentication failed'
            }
        });
    }
};

/**
 * Optional authentication middleware
 * Attaches administrator if token is valid, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
    try {
        let token = null;

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        if (!token && req.cookies && req.cookies.auth_token) {
            token = req.cookies.auth_token;
        }

        if (token) {
            const decoded = verifyToken(token);
            if (decoded) {
                const administrator = await Administrator.findByPk(decoded.id, {
                    attributes: { exclude: ['password_hash'] }
                });
                if (administrator) {
                    req.administrator = administrator;
                    req.token = token;
                }
            }
        }

        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};

module.exports = {
    authenticate,
    optionalAuth
};
