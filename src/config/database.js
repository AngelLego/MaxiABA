const { Sequelize } = require('sequelize');

// Determine database dialect
const DB_DIALECT = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (DB_DIALECT === 'sqlite') {
    // SQLite configuration (for development/testing)
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE || './database.sqlite',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        define: {
            timestamps: true,
            underscored: true
        }
    });
} else {
    // MySQL configuration (for production)
    sequelize = new Sequelize(
        process.env.DB_NAME || 'maxi_servicios_aba',
        process.env.DB_USER || 'root',
        process.env.DB_PASSWORD || '',
        {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            dialect: 'mysql',
            logging: process.env.NODE_ENV === 'development' ? console.log : false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps: true,
                underscored: true
            }
        }
    );
}

// Test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error.message);
    }
};

testConnection();

module.exports = sequelize;
