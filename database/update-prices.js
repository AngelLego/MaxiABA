const { FuelPrice, sequelize } = require('../src/models');
require('dotenv').config();

async function updatePrices() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to database');

        // Update Magna
        await FuelPrice.update(
            { price: 24.80 },
            { where: { fuel_type: 'magna' } }
        );
        console.log('✅ Magna updated to $24.80');

        // Update Premium
        await FuelPrice.update(
            { price: 25.90 },
            { where: { fuel_type: 'premium' } }
        );
        console.log('✅ Premium updated to $25.90');

        // Update Diesel
        await FuelPrice.update(
            { price: 26.10 },
            { where: { fuel_type: 'diesel' } }
        );
        console.log('✅ Diesel updated to $26.10');

        console.log('\n🎉 All prices updated successfully!');
    } catch (error) {
        console.error('❌ Error updating prices:', error);
    } finally {
        await sequelize.close();
    }
}

updatePrices();
