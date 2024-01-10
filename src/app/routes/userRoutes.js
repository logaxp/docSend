const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/helper.auth');
const userController = require('../controllers/userController');

router.get('/tenant/staff', authMiddleware, userController.fetchAllStaff)


module.exports = router;