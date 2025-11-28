const { sequelize, Administrator, FuelPrice, Promotion, ContactMessage, SiteStatistic } = require('../src/models');
require('dotenv').config();

async function initializeDatabase() {
    try {
        console.log('🔄 Initializing SQLite database...');

        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database connection established');

        // Sync all models (create tables)
        await sequelize.sync({ force: true }); // force: true drops existing tables
        console.log('✅ All tables created');

        // Create default administrator
        const admin = await Administrator.create({
            username: 'admin',
            email: 'buzon@maxiserviciosaba.com',
            password_hash: 'Admin123!'
        });
        console.log('✅ Default administrator created');
        console.log('   Username: admin');
        console.log('   Password: Admin123!');
        console.log('   ⚠️  CHANGE THIS PASSWORD IN PRODUCTION!');

        // Create default fuel prices
        const fuelTypes = [
            { fuel_type: 'magna', price: 21.50 },
            { fuel_type: 'premium', price: 23.80 },
            { fuel_type: 'diesel', price: 22.30 }
        ];

        for (const fuel of fuelTypes) {
            await FuelPrice.create({
                ...fuel,
                updated_by: admin.id
            });
            console.log(`✅ Created fuel price for ${fuel.fuel_type}: $${fuel.price}`);
        }

        // Create sample promotion
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        await Promotion.create({
            title: 'Promoción de Bienvenida',
            description: 'Descuento especial en tu primera carga de combustible. ¡Aprovecha esta oferta!',
            valid_from: today.toISOString().split('T')[0],
            valid_until: nextMonth.toISOString().split('T')[0],
            is_active: true,
            created_by: admin.id
        });
        console.log('✅ Sample promotion created');

        // Initialize statistics
        const metrics = ['page_view', 'whatsapp_click', 'price_view'];
        for (const metric of metrics) {
            await SiteStatistic.create({
                metric_name: metric,
                metric_value: 0,
                date: today.toISOString().split('T')[0]
            });
        }
        console.log('✅ Statistics initialized');

        console.log('\n🎉 Database initialized successfully!');
        console.log('\n📍 Database location: ./database.sqlite');
        console.log('\n🚀 You can now run: npm run dev');

    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await sequelize.close();
    }
}

if (require.main === module) {
    initializeDatabase();
}

module.exports = initializeDatabase;
