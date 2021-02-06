const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

/* GET app-dashboard items */
router.post('/register', authController.register);
router.get('/register', authController.verify, authController.getRegisteredUser);

module.exports = router;
