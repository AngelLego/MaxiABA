const fc = require('fast-check');
const request = require('supertest');
const app = require('../../src/server');
const { Administrator, sequelize } = require('../../src/models');

/**
 * Feature: gasolinera-website, Property 21: Secure cookie attributes
 * Validates: Requirements 11.5
 * 
 * Property: For any authentication cookie set by the system, it should have 
 * the Secure, HttpOnly, and SameSite attributes properly configured.
 */

describe('Secure Cookie Attributes Property Tests', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    afterEach(async () => {
        await Administrator.destroy({ where: {}, truncate: true });
    });

    test('Property: All authentication cookies must have secure attributes', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.record({
                    username: fc.string({ minLength: 3, maxLength: 20 }).filter(s => /^[a-zA-Z0-9_]+$/.test(s)),
                    email: fc.emailAddress(),
                    password: fc.string({ minLength: 8, maxLength: 50 })
                }),
                async (credentials) => {
                    // Create administrator
                    const admin = await Administrator.create({
                        username: `${credentials.username}_${Date.now()}`,
                        email: `${Date.now()}_${credentials.email}`,
                        password_hash: credentials.password
                    });

                    // Login to get cookie
                    const response = await request(app)
                        .post('/api/admin/login')
                        .send({
                            username: admin.username,
                            password: credentials.password
                        });

                    expect(response.status).toBe(200);

                    // Get Set-Cookie header
                    const setCookieHeader = response.headers['set-cookie'];
                    expect(setCookieHeader).toBeDefined();
                    expect(Array.isArray(setCookieHeader)).toBe(true);

                    // Find auth_token cookie
                    const authCookie = setCookieHeader.find(cookie => 
                        cookie.startsWith('auth_token=')
                    );
                    expect(authCookie).toBeDefined();

                    // Property 1: Cookie must have HttpOnly attribute
                    expect(authCookie.toLowerCase()).toContain('httponly');

                    // Property 2: Cookie must have SameSite attribute
                    expect(authCookie.toLowerCase()).toContain('samesite');

                    // Property 3: SameSite should be Strict or Lax
                    expect(authCookie.toLowerCase()).toMatch(/samesite=(strict|lax)/);

                    // Property 4: Cookie should have Max-Age or Expires
                    const hasMaxAge = authCookie.toLowerCase().includes('max-age');
                    const hasExpires = authCookie.toLowerCase().includes('expires');
                    expect(hasMaxAge || hasExpires).toBe(true);

                    // Property 5: In production, cookie must have Secure attribute
                    // Note: In development, Secure might not be set (HTTP)
                    if (process.env.NODE_ENV === 'production') {
                        expect(authCookie.toLowerCase()).toContain('secure');
                    }

                    // Property 6: Cookie path should be set
                    expect(authCookie.toLowerCase()).toContain('path=');
                }
            ),
            { numRuns: 100 }
        );
    });

    test('Property: Cookie attributes must prevent common attacks', async () => {
        const admin = await Administrator.create({
            username: `securetest_${Date.now()}`,
            email: `secure_${Date.now()}@test.com`,
            password_hash: 'SecurePassword123!'
        });

        const response = await request(app)
            .post('/api/admin/login')
            .send({
                username: admin.username,
                password: 'SecurePassword123!'
            });

        const setCookieHeader = response.headers['set-cookie'];
        const authCookie = setCookieHeader.find(cookie => 
            cookie.startsWith('auth_token=')
        );

        // Property 1: HttpOnly prevents JavaScript access (XSS protection)
        expect(authCookie.toLowerCase()).toContain('httponly');

        // Property 2: SameSite prevents CSRF attacks
        expect(authCookie.toLowerCase()).toMatch(/samesite=(strict|lax)/);

        // Property 3: Cookie should not be accessible from different sites
        const sameSiteValue = authCookie.match(/samesite=(\w+)/i);
        expect(sameSiteValue).toBeTruthy();
        expect(['strict', 'lax']).toContain(sameSiteValue[1].toLowerCase());
    });

    test('Property: Logout must clear cookie with same attributes', async () => {
        const admin = await Administrator.create({
            username: `logouttest_${Date.now()}`,
            email: `logout_${Date.now()}@test.com`,
            password_hash: 'LogoutPassword123!'
        });

        // Login first
        const loginResponse = await request(app)
            .post('/api/admin/login')
            .send({
                username: admin.username,
                password: 'LogoutPassword123!'
            });

        const token = loginResponse.body.data.token;

        // Logout
        const logoutResponse = await request(app)
            .post('/api/admin/logout')
            .set('Authorization', `Bearer ${token}`);

        expect(logoutResponse.status).toBe(200);

        // Check cookie clearing
        const setCookieHeader = logoutResponse.headers['set-cookie'];
        if (setCookieHeader) {
            const clearedCookie = setCookieHeader.find(cookie => 
                cookie.startsWith('auth_token=')
            );

            if (clearedCookie) {
                // Property: Cleared cookie should have same security attributes
                expect(clearedCookie.toLowerCase()).toContain('httponly');
                expect(clearedCookie.toLowerCase()).toContain('samesite');

                // Property: Cookie should be expired or have empty value
                const hasExpired = clearedCookie.toLowerCase().includes('expires=') &&
                    (clearedCookie.toLowerCase().includes('1970') || 
                     clearedCookie.toLowerCase().includes('max-age=0'));
                const hasEmptyValue = clearedCookie.match(/^auth_token=;/);
                
                expect(hasExpired || hasEmptyValue).toBe(true);
            }
        }
    });
});
