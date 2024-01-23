const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/helper.auth');
const userController = require('../controllers/userController');

router.get('/tenant/staff', authMiddleware, userController.fetchAllStaff)
.get('/tenant/staff/search', authMiddleware, userController.searchStaff)
.patch('/tenant/staff/role', authMiddleware, userController.updateStaffRole)
.delete('/tenant/staff/:id', authMiddleware, userController.deleteStaff)


module.exports = router;