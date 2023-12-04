const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

router.post('/tenant', tenantController.createTenant)
.patch('/tenant/activate', tenantController.activateTenant)
.post('/tenant/login', tenantController.loginTenant)


module.exports = router;



