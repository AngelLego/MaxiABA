const fc = require('fast-check');
const bcrypt = require('bcryptjs');
const { Administrator, sequelize } = require('../../src/models');

/**
 * Feature: gasolinera-website, Property 18: Password hashing
 * Validates: Requirements 11.2
 * 
 * Property: For any administrator password stored in the database, 
 * it should be hashed using bcrypt or equivalent secure algorithm, 
 * never stored in plaintext.
 */

describe('Administrator Password Hashing Property Tests', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    afterEach(async () => {
        await Administrator.destroy({ where: {}, truncate: true });
    });

    test('Property: All stored passwords must be hashed, never plaintext', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 8, maxLength: 50 }), // Generate random passwords
                fc.string({ minLength: 3, maxLength: 20 }).filter(s => /^[a-zA-Z0-9_]+$/.test(s)), // username
                fc.emailAddress(), // email
                async (password, username, email) => {
                    // Create administrator with password
                    const admin = await Administrator.create({
                        username: `${username}_${Date.now()}`,
                        email: `${Date.now()}_${email}`,
                        password_hash: password
                    });

                    // Retrieve from database
                    const storedAdmin = await Administrator.findByPk(admin.id);

                    // Property 1: Stored password should NOT be plaintext
                    expect(storedAdmin.password_hash).not.toBe(password);

                    // Property 2: Stored password should be a valid bcrypt hash
                    // Bcrypt hashes start with $2a$, $2b$, or $2y$ and are 60 characters
                    expect(storedAdmin.password_hash).toMatch(/^\$2[aby]\$\d{2}\$.{53}$/);

                    // Property 3: Should be able to verify the original password
                    const isValid = await storedAdmin.verifyPassword(password);
                    expect(isValid).toBe(true);

                    // Property 4: Wrong password should not verify
                    const isInvalid = await storedAdmin.verifyPassword(password + 'wrong');
                    expect(isInvalid).toBe(false);

                    // Property 5: Hash should be different even for same password (due to salt)
                    const admin2 = await Administrator.create({
                        username: `${username}_2_${Date.now()}`,
                        email: `2_${Date.now()}_${email}`,
                        password_hash: password
                    });
                    expect(admin2.password_hash).not.toBe(storedAdmin.password_hash);
                }
            ),
            { numRuns: 100 } // Run 100 iterations as specified
        );
    });

    test('Property: Password updates should also be hashed', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.string({ minLength: 8, maxLength: 50 }),
                fc.string({ minLength: 8, maxLength: 50 }),
                fc.string({ minLength: 3, maxLength: 20 }).filter(s => /^[a-zA-Z0-9_]+$/.test(s)),
                fc.emailAddress(),
                async (initialPassword, newPassword, username, email) => {
                    // Create admin with initial password
                    const admin = await Administrator.create({
                        username: `${username}_${Date.now()}`,
                        email: `${Date.now()}_${email}`,
                        password_hash: initialPassword
                    });

                    const initialHash = admin.password_hash;

                    // Update password
                    admin.password_hash = newPassword;
                    await admin.save();

                    // Reload from database
                    await admin.reload();

                    // Property 1: New password should be hashed
                    expect(admin.password_hash).not.toBe(newPassword);
                    expect(admin.password_hash).toMatch(/^\$2[aby]\$\d{2}\$.{53}$/);

                    // Property 2: Hash should be different from initial
                    if (initialPassword !== newPassword) {
                        expect(admin.password_hash).not.toBe(initialHash);
                    }

                    // Property 3: New password should verify correctly
                    const isValid = await admin.verifyPassword(newPassword);
                    expect(isValid).toBe(true);

                    // Property 4: Old password should not verify
                    if (initialPassword !== newPassword) {
                        const isOldValid = await admin.verifyPassword(initialPassword);
                        expect(isOldValid).toBe(false);
                    }
                }
            ),
            { numRuns: 100 }
        );
    });
});
