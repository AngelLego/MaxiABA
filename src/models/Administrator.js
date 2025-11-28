const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const Administrator = sequelize.define('Administrator', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [3, 50]
        }
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password_hash'
    }
}, {
    tableName: 'administrators',
    timestamps: true,
    underscored: true,
    hooks: {
        beforeCreate: async (administrator) => {
            if (administrator.password_hash) {
                administrator.password_hash = await bcrypt.hash(administrator.password_hash, 10);
            }
        },
        beforeUpdate: async (administrator) => {
            if (administrator.changed('password_hash')) {
                administrator.password_hash = await bcrypt.hash(administrator.password_hash, 10);
            }
        }
    }
});

// Instance method to verify password
Administrator.prototype.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
};

// Class method to find by credentials
Administrator.findByCredentials = async function(usernameOrEmail, password) {
    const admin = await Administrator.findOne({
        where: {
            [sequelize.Sequelize.Op.or]: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        }
    });

    if (!admin) {
        return null;
    }

    const isValid = await admin.verifyPassword(password);
    return isValid ? admin : null;
};

module.exports = Administrator;
