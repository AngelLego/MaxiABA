const { FuelPrice } = require('../models');

/**
 * Get all fuel prices (public)
 * GET /api/fuel-prices
 */
const getFuelPrices = async (req, res) => {
    try {
        const prices = await FuelPrice.findAll({
            order: [['fuel_type', 'ASC']]
        });

        res.json({
            success: true,
            data: prices
        });
    } catch (error) {
        console.error('Error fetching fuel prices:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_ERROR',
                message: 'Error al obtener los precios'
            }
        });
    }
};

/**
 * Update fuel prices (authenticated)
 * PUT /api/admin/fuel-prices
 */
const updateFuelPrices = async (req, res) => {
    try {
        const { prices } = req.body;

        if (!prices || !Array.isArray(prices)) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INVALID_DATA',
                    message: 'Datos inválidos'
                }
            });
        }

        const updated = [];

        for (const priceData of prices) {
            const { fuel_type, price } = priceData;

            if (!fuel_type || price === undefined) {
                continue;
            }

            const [fuelPrice] = await FuelPrice.findOrCreate({
                where: { fuel_type },
                defaults: { price, updated_by: req.administrator.id }
            });

            fuelPrice.price = price;
            fuelPrice.updated_by = req.administrator.id;
            await fuelPrice.save();

            updated.push(fuelPrice);
        }

        res.json({
            success: true,
            data: updated,
            message: 'Precios actualizados exitosamente'
        });
    } catch (error) {
        console.error('Error updating fuel prices:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'UPDATE_ERROR',
                message: 'Error al actualizar los precios'
            }
        });
    }
};

module.exports = {
    getFuelPrices,
    updateFuelPrices
};
