const { Promotion } = require('../models');
const { Op } = require('sequelize');

/**
 * Get active promotions (public)
 * GET /api/promotions
 */
const getActivePromotions = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];

        const promotions = await Promotion.findAll({
            where: {
                is_active: true,
                valid_from: { [Op.lte]: today },
                valid_until: { [Op.gte]: today }
            },
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: promotions
        });
    } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_ERROR',
                message: 'Error al obtener las promociones'
            }
        });
    }
};

/**
 * Get all promotions (authenticated)
 * GET /api/admin/promotions
 */
const getAllPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.findAll({
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: promotions
        });
    } catch (error) {
        console.error('Error fetching all promotions:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'FETCH_ERROR',
                message: 'Error al obtener las promociones'
            }
        });
    }
};

/**
 * Create promotion (authenticated)
 * POST /api/admin/promotions
 */
const createPromotion = async (req, res) => {
    try {
        const { title, description, image_url, valid_from, valid_until, is_active } = req.body;

        if (!title || !description || !valid_from || !valid_until) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'MISSING_FIELDS',
                    message: 'Faltan campos requeridos'
                }
            });
        }

        const promotion = await Promotion.create({
            title,
            description,
            image_url,
            valid_from,
            valid_until,
            is_active: is_active !== undefined ? is_active : true,
            created_by: req.administrator.id
        });

        res.status(201).json({
            success: true,
            data: promotion,
            message: 'Promoción creada exitosamente'
        });
    } catch (error) {
        console.error('Error creating promotion:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'CREATE_ERROR',
                message: error.message || 'Error al crear la promoción'
            }
        });
    }
};

/**
 * Update promotion (authenticated)
 * PUT /api/admin/promotions/:id
 */
const updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image_url, valid_from, valid_until, is_active } = req.body;

        const promotion = await Promotion.findByPk(id);

        if (!promotion) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Promoción no encontrada'
                }
            });
        }

        await promotion.update({
            title: title || promotion.title,
            description: description || promotion.description,
            image_url: image_url !== undefined ? image_url : promotion.image_url,
            valid_from: valid_from || promotion.valid_from,
            valid_until: valid_until || promotion.valid_until,
            is_active: is_active !== undefined ? is_active : promotion.is_active
        });

        res.json({
            success: true,
            data: promotion,
            message: 'Promoción actualizada exitosamente'
        });
    } catch (error) {
        console.error('Error updating promotion:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'UPDATE_ERROR',
                message: 'Error al actualizar la promoción'
            }
        });
    }
};

/**
 * Delete promotion (authenticated)
 * DELETE /api/admin/promotions/:id
 */
const deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;

        const promotion = await Promotion.findByPk(id);

        if (!promotion) {
            return res.status(404).json({
                success: false,
                error: {
                    code: 'NOT_FOUND',
                    message: 'Promoción no encontrada'
                }
            });
        }

        await promotion.destroy();

        res.json({
            success: true,
            message: 'Promoción eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error deleting promotion:', error);
        res.status(500).json({
            success: false,
            error: {
                code: 'DELETE_ERROR',
                message: 'Error al eliminar la promoción'
            }
        });
    }
};

module.exports = {
    getActivePromotions,
    getAllPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion
};
