const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/', paymentController.payment);

module.exports = router;