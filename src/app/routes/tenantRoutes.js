const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const authMiddleware = require('../middlewares/helper.auth');

router.post('/tenant', tenantController.createTenant)
.patch('/tenant/activate', tenantController.activateTenant)
.post('/tenant/login', tenantController.loginTenant)
.post('/tenant/create/stream', authMiddleware, tenantController.createTenantStream)
.get('/tenant/stream', authMiddleware, tenantController.listTenantStream)


module.exports = router;



