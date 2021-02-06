const express = require('express');
const authController = require('../controllers/auth.controller');
const dashboardController = require('../controllers/dashboard.controller');
const router = express.Router();

/* GET app-dashboard items */
router.get('/summary', authController.verify, dashboardController.summary);
router.get('/collaborators', authController.verify, dashboardController.collaborators);

module.exports = router;
