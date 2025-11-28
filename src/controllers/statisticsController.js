const { SiteStatistic } = require('../models');

/**
 * Track statistic (public)
 * POST /api/statistics/track
 */
const trackStatistic = async (req, res) => {
    try {
        const { metric_name } = req.body;

        if (!metric_name) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'MISSING_METRIC',
                    message: 'Nombre de métrica requerido'
                }
            });
        }

        await SiteStatistic.incrementMetric(metric_name);

        res.json({
            success: true,
            message: 'Estadística registrada'
        });
    } catch (error) {
        console.error('Error tracking statistic:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'TRACK_ERROR',
                message: 'Error al registrar estadística'
            }
        });
    }
};

/**
 * Get statistics (authenticated)
 * GET /api/admin/statistics
 */
const getStatistics = async (req, res) => {
    try {
        const { start_date, end_date } = req.query;

        const endDate = end_date || new Date().toISOString().split('T')[0];
        const startDate = start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const statistics = await SiteStatistic.getStatistics(startDate, endDate);

        // Aggregate by metric
        const aggregated = {};
        statistics.forEach(stat => {
            if (!aggregated[stat.metric_name]) {
                aggregated[stat.metric_name] = 0;
            }
            aggregated[stat.metric_name] += stat.metric_value;
        });

        res.json({
            success: true,
            data: {
                aggregated,
                detailed: statistics
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_ERROR',
                message: 'Error al obtener estadísticas'
            }
        });
    }
};

module.exports = {
    trackStatistic,
    getStatistics
};
