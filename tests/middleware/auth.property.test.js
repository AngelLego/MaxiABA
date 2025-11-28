const fc = require('fast-check');
const request = require('supertest');
const app = require('../../src/server');
const { Administrator, sequelize } = require('../../src/models');
const { generateToken } = require('../../src/utils/jwt');

/**
 * Feature: gasolinera-website, Property 9: Authentication requirement
 * Validates: Requirements 7.1
 * 
 * Property: For any request to admin panel endpoints without valid authentication 
 * credentials, the system should deny access and return an unauthorized error.
 */

describe('Authentication Requirement Property Tests', () => {
    let testAdmin;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        
        // Create a test administrator
        testAdmin = await Administrator.create({
            username: 'testadmin',
            email: 'test@maxiserviciosaba.com',
            password_hash: 'TestPassword123!'
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('Property: All admin endpoints must reject requests without authentication', async () => {
        // Define admin endpoints that require authentication
        const protectedEndpoints = [
            { method: 'get', path: '/api/admin/verify' },
            { method: 'post', path: '/api/admin/logout' }
        ];

        await fc.assert(
            fc.asyncProperty(
                fc.constantFrom(...protectedEndpoints),
                async (endpoint) => {
                    // Make request without authentication
                    const response = await request(app)
                        [endpoint.method](endpoint.path)
                        .send({});

                    // Property 1: Must return 401 Unauthorized
                    expect(response.status).toBe(401);

                    // Property 2: Response must indicate authentication error
                    expect(response.body.success).toBe(false);
                    expect(response.body.error).toBeDefined();
                    expect(response.body.error.code).toMatch(/UNAUTHORIZED|INVALID_TOKEN|AUTH_ERROR/);
                }
            ),
            { numRuns: 100 }
        );
    });

    test('Property: Invalid tokens must be rejected', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 10, maxLength: 100 }), // Random invalid tokens
                async (invalidToken) => {
                    const response = await request(app)
                        .get('/api/admin/verify')
                        .set('Authorization', `Bearer ${invalidToken}`);

                    // Property: Invalid tokens must result in 401
                    expect(response.status).toBe(401);
                    expect(response.body.success).toBe(false);
                }
            ),
            { numRuns: 100 }
        );
    });

    test('Property: Valid tokens must grant access', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.constant(testAdmin),
                async (admin) => {
                    // Generate valid token
                    const validToken = generateToken(admin);

                    const response = await request(app)
                        .get('/api/admin/verify')
                        .set('Authorization', `Bearer ${validToken}`);

                    // Property 1: Valid token must grant access (200 or 2xx)
                    expect(response.status).toBeGreaterThanOrEqual(200);
                    expect(response.status).toBeLessThan(300);

                    // Property 2: Response must be successful
                    expect(response.body.success).toBe(true);

                    // Property 3: Administrator data must be returned
                    expect(response.body.data).toBeDefined();
                    expect(response.body.data.administrator).toBeDefined();
                    expect(response.body.data.administrator.id).toBe(admin.id);
                }
            ),
            { numRuns: 100 }
        );
    });

    test('Property: Requests without Authorization header or cookie must be rejected', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.record({
                    includeHeader: fc.boolean(),
                    includeCookie: fc.boolean()
                }).filter(config => !config.includeHeader && !config.includeCookie), // Neither present
                async (config) => {
                    const req = request(app).get('/api/admin/verify');

                    const response = await req;

                    // Property: Must be rejected with 401
                    expect(response.status).toBe(401);
                    expect(response.body.success).toBe(false);
                    expect(response.body.error.code).toBe('UNAUTHORIZED');
                }
            ),
            { numRuns: 100 }
        );
    });

    test('Property: Authentication must work with both header and cookie', async () => {
        const validToken = generateToken(testAdmin);

        // Test with Authorization header
        const headerResponse = await request(app)
            .get('/api/admin/verify')
            .set('Authorization', `Bearer ${validToken}`);

        expect(headerResponse.status).toBe(200);
        expect(headerResponse.body.success).toBe(true);

        // Test with cookie
        const cookieResponse = await request(app)
            .get('/api/admin/verify')
            .set('Cookie', [`auth_token=${validToken}`]);

        expect(cookieResponse.status).toBe(200);
        expect(cookieResponse.body.success).toBe(true);

        // Property: Both methods should return same administrator
        expect(headerResponse.body.data.administrator.id).toBe(
            cookieResponse.body.data.administrator.id
        );
    });
});
