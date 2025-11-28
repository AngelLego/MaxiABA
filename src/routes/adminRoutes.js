const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const fuelPricesController = require('../controllers/fuelPricesController');
const promotionsController = require('../controllers/promotionsController');
const contactController = require('../controllers/contactController');
const statisticsController = require('../controllers/statisticsController');

// All admin routes require authentication
router.use(authenticate);

// Fuel Prices Management
router.put('/fuel-prices', fuelPricesController.updateFuelPrices);

// Promotions Management
router.get('/promotions', promotionsController.getAllPromotions);
router.post('/promotions', promotionsController.createPromotion);
router.put('/promotions/:id', promotionsController.updatePromotion);
router.delete('/promotions/:id', promotionsController.deletePromotion);

// Contact Messages
router.get('/contacts', contactController.getAllContacts);
router.put('/contacts/:id/read', contactController.markAsRead);

// Statistics
router.get('/statistics', statisticsController.getStatistics);

module.exports = router;
