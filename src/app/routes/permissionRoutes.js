const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/helper.auth');
const permissionController = require('../controllers/permissionController');

router.get('/tenant/permission', authMiddleware, permissionController.fetchAllPermission)


module.exports = router;