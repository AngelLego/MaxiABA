const fc = require('fast-check');
const { Promotion, sequelize } = require('../../src/models');
const { Op } = require('sequelize');

/**
 * Feature: gasolinera-website, Property 7: Active promotions filtering
 * Validates: Requirements 6.1
 * 
 * Property: For any set of promotions in the database, when the promotions 
 * endpoint is called, only promotions where the current date falls between 
 * valid_from and valid_until and is_active is true should be returned.
 */

describe('Promotion Date Filtering Property Tests', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    afterEach(async () => {
        await Promotion.destroy({ where: {}, truncate: true });
    });

    // Helper to generate date relative to today
    const dateArbitrary = (minDaysOffset, maxDaysOffset) => {
        return fc.integer({ min: minDaysOffset, max: maxDaysOffset }).map(days => {
            const date = new Date();
            date.setDate(date.getDate() + days);
            return date.toISOString().split('T')[0];
        });
    };

    test('Property: Only active promotions within valid date range should be returned', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.array(
                    fc.record({
                        title: fc.string({ minLength: 5, maxLength: 50 }),
                        description: fc.string({ minLength: 10, maxLength: 200 }),
                        daysBeforeStart: fc.integer({ min: -30, max: 30 }),
                        duration: fc.integer({ min: 1, max: 60 }),
                        isActive: fc.boolean()
                    }),
                    { minLength: 5, maxLength: 20 }
                ),
                async (promotionSpecs) => {
                    // Create promotions with various date ranges
                    const createdPromotions = [];
                    for (let i = 0; i < promotionSpecs.length; i++) {
                        const spec = promotionSpecs[i];
                        const startDate = new Date();
                        startDate.setDate(startDate.getDate() + spec.daysBeforeStart);
                        
                        const endDate = new Date(startDate);
                        endDate.setDate(endDate.getDate() + spec.duration);

                        const promotion = await Promotion.create({
                            title: `${spec.title}_${i}_${Date.now()}`,
                            description: spec.description,
                            valid_from: startDate.toISOString().split('T')[0],
                            valid_until: endDate.toISOString().split('T')[0],
                            is_active: spec.isActive
                        });

                        createdPromotions.push({
                            promotion,
                            spec,
                            startDate,
                            endDate
                        });
                    }

                    // Query for active promotions (simulating the API endpoint logic)
                    const today = new Date().toISOString().split('T')[0];
                    const activePromotions = await Promotion.findAll({
                        where: {
                            is_active: true,
                            valid_from: { [Op.lte]: today },
                            valid_until: { [Op.gte]: today }
                        }
                    });

                    // Verify properties
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);

                    for (const result of activePromotions) {
                        // Property 1: All returned promotions must be active
                        expect(result.is_active).toBe(true);

                        // Property 2: valid_from must be <= today
                        const validFrom = new Date(result.valid_from);
                        expect(validFrom <= now).toBe(true);

                        // Property 3: valid_until must be >= today
                        const validUntil = new Date(result.valid_until);
                        expect(validUntil >= now).toBe(true);
                    }

                    // Property 4: No inactive promotions should be returned
                    const inactiveInResults = activePromotions.filter(p => !p.is_active);
                    expect(inactiveInResults.length).toBe(0);

                    // Property 5: No expired promotions should be returned
                    const expiredInResults = activePromotions.filter(p => {
                        const until = new Date(p.valid_until);
                        return until < now;
                    });
                    expect(expiredInResults.length).toBe(0);

                    // Property 6: No future promotions should be returned
                    const futureInResults = activePromotions.filter(p => {
                        const from = new Date(p.valid_from);
                        return from > now;
                    });
                    expect(futureInResults.length).toBe(0);

                    // Property 7: All valid active promotions should be included
                    const expectedCount = createdPromotions.filter(({ spec, startDate, endDate }) => {
                        return spec.isActive && startDate <= now && endDate >= now;
                    }).length;
                    expect(activePromotions.length).toBe(expectedCount);
                }
            ),
            { numRuns: 100 }
        );
    });

    test('Property: Promotion scope "active" should filter correctly', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.integer({ min: 3, max: 10 }),
                async (count) => {
                    const promotions = [];
                    
                    // Create mix of active/inactive, current/past/future promotions
                    for (let i = 0; i < count; i++) {
                        const daysOffset = (i % 3) - 1; // -1, 0, 1 (past, current, future)
                        const startDate = new Date();
                        startDate.setDate(startDate.getDate() + daysOffset * 10);
                        
                        const endDate = new Date(startDate);
                        endDate.setDate(endDate.getDate() + 5);

                        promotions.push(await Promotion.create({
                            title: `Promo ${i} ${Date.now()}`,
                            description: `Description ${i}`,
                            valid_from: startDate.toISOString().split('T')[0],
                            valid_until: endDate.toISOString().split('T')[0],
                            is_active: i % 2 === 0 // Alternate active/inactive
                        }));
                    }

                    // Use the active scope
                    const activePromotions = await Promotion.scope('active').findAll();

                    // Property: All returned promotions should pass isCurrentlyValid check
                    for (const promo of activePromotions) {
                        expect(promo.isCurrentlyValid()).toBe(true);
                    }
                }
            ),
            { numRuns: 100 }
        );
    });
});
