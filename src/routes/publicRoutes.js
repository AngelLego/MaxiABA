const express = require('express');
const router = express.Router();
const fuelPricesController = require('../controllers/fuelPricesController');
const promotionsController = require('../controllers/promotionsController');
const contactController = require('../controllers/contactController');
const statisticsController = require('../controllers/statisticsController');

// Fuel Prices (public)
router.get('/fuel-prices', fuelPricesController.getFuelPrices);

// Promotions (public)
router.get('/promotions', promotionsController.getActivePromotions);

// Contact (public)
router.post('/contact', contactController.submitContact);

// Statistics tracking (public)
router.post('/statistics/track', statisticsController.trackStatistic);

module.exports = router;
