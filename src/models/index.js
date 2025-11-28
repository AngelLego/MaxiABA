const sequelize = require('../config/database');
const Administrator = require('./Administrator');
const FuelPrice = require('./FuelPrice');
const Promotion = require('./Promotion');
const ContactMessage = require('./ContactMessage');
const SiteStatistic = require('./SiteStatistic');

// Define relationships
Administrator.hasMany(FuelPrice, {
    foreignKey: 'updated_by',
    as: 'updatedPrices'
});

FuelPrice.belongsTo(Administrator, {
    foreignKey: 'updated_by',
    as: 'updatedBy'
});

Administrator.hasMany(Promotion, {
    foreignKey: 'created_by',
    as: 'createdPromotions'
});

Promotion.belongsTo(Administrator, {
    foreignKey: 'created_by',
    as: 'creator'
});

// Sync all models
const syncDatabase = async (options = {}) => {
    try {
        await sequelize.sync(options);
        console.log('✅ All models synchronized with database');
    } catch (error) {
        console.error('❌ Error synchronizing models:', error);
        throw error;
    }
};

module.exports = {
    sequelize,
    Administrator,
    FuelPrice,
    Promotion,
    ContactMessage,
    SiteStatistic,
    syncDatabase
};
