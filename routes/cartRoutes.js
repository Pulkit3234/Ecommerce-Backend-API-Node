const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/', authMiddleware, cartController.recieveCart);
router.get('/', authMiddleware, cartController.sendCart);
router.post('/orderstatus', authMiddleware, cartController.orderStatus);

module.exports = router;