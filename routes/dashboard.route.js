const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const router = express.Router();

/* GET app-dashboard items */
router.get('/summary', dashboardController.summary);
router.get('/collaborators', dashboardController.collaborators);

module.exports = router;
