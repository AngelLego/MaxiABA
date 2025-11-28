const { Administrator, FuelPrice, sequelize } = require('../src/models');
require('dotenv').config();

async function seedDatabase() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to database');

        // Create default administrator
        const [admin, created] = await Administrator.findOrCreate({
            where: { username: 'admin' },
            defaults: {
                username: 'admin',
                email: 'buzon@maxiserviciosaba.com',
                password_hash: 'Admin123!' // Change this in production!
            }
        });

        if (created) {
            console.log('✅ Default administrator created');
            console.log('   Username: admin');
            console.log('   Password: Admin123!');
            console.log('   ⚠️  CHANGE THIS PASSWORD IN PRODUCTION!');
        } else {
            console.log('ℹ️  Administrator already exists');
        }

        // Ensure fuel prices exist
        const fuelTypes = ['magna', 'premium', 'diesel'];
        for (const fuelType of fuelTypes) {
            const [price, created] = await FuelPrice.findOrCreate({
                where: { fuel_type: fuelType },
                defaults: {
                    fuel_type: fuelType,
                    price: 0.00,
                    updated_by: admin.id
                }
            });

            if (created) {
                console.log(`✅ Created fuel price for ${fuelType}`);
            }
        }

        console.log('\n🎉 Database seeded successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
