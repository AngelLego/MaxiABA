const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FuelPrice = sequelize.define('FuelPrice', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fuel_type: {
        type: DataTypes.ENUM('magna', 'premium', 'diesel'),
        allowNull: false,
        unique: true,
        validate: {
            isIn: [['magna', 'premium', 'diesel']]
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
            isDecimal: true
        }
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'administrators',
            key: 'id'
        }
    }
}, {
    tableName: 'fuel_prices',
    timestamps: false,
    underscored: true,
    hooks: {
        beforeUpdate: (fuelPrice) => {
            // Ensure updated_at is set
            fuelPrice.setDataValue('updated_at', new Date());
        }
    }
});

// Add updated_at field manually since timestamps is false
FuelPrice.rawAttributes.updated_at = {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
};

module.exports = FuelPrice;
