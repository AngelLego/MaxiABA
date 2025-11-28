const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Promotion = sequelize.define('Promotion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 200]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    valid_from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    valid_until: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isAfterValidFrom(value) {
                if (this.valid_from && new Date(value) < new Date(this.valid_from)) {
                    throw new Error('valid_until must be after or equal to valid_from');
                }
            }
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'administrators',
            key: 'id'
        }
    }
}, {
    tableName: 'promotions',
    timestamps: true,
    underscored: true
});

// Instance method to check if promotion is currently valid
Promotion.prototype.isCurrentlyValid = function() {
    const now = new Date();
    const from = new Date(this.valid_from);
    const until = new Date(this.valid_until);
    
    return this.is_active && now >= from && now <= until;
};

// Scope to get only active promotions
Promotion.addScope('active', {
    where: {
        is_active: true,
        valid_from: {
            [sequelize.Sequelize.Op.lte]: sequelize.Sequelize.fn('CURDATE')
        },
        valid_until: {
            [sequelize.Sequelize.Op.gte]: sequelize.Sequelize.fn('CURDATE')
        }
    }
});

module.exports = Promotion;
