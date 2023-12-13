const express = require('express');
const router = express.Router();


// require Template controller
const templateController = require('../controllers/templateController');
const authMiddleware = require('../middlewares/helper.auth');
const {upload} = require('../middlewares/helper.file.upload')


router.post('/template/create', authMiddleware, templateController.createCustomTemplate)
.get('/tentant/templates', authMiddleware, templateController.fitchTenantTemplate)
.post('/upload/template', authMiddleware, upload.single('file'), templateController.uploadCustomTemplate)


module.exports = router;
