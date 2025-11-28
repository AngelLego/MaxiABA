const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SiteStatistic = sequelize.define('SiteStatistic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    metric_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['page_view', 'whatsapp_click', 'price_view']]
        }
    },
    metric_value: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'site_statistics',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['metric_name', 'date']
        }
    ]
});

// Class method to increment a metric
SiteStatistic.incrementMetric = async function(metricName) {
    const today = new Date().toISOString().split('T')[0];
    
    const [statistic, created] = await SiteStatistic.findOrCreate({
        where: {
            metric_name: metricName,
            date: today
        },
        defaults: {
            metric_value: 1
        }
    });

    if (!created) {
        await statistic.increment('metric_value');
    }

    return statistic;
};

// Class method to get statistics for a date range
SiteStatistic.getStatistics = async function(startDate, endDate) {
    return await SiteStatistic.findAll({
        where: {
            date: {
                [sequelize.Sequelize.Op.between]: [startDate, endDate]
            }
        },
        order: [['date', 'DESC'], ['metric_name', 'ASC']]
    });
};

module.exports = SiteStatistic;
