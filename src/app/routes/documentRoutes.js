const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/helper.auth');
const documentController = require('../controllers/documentController');
const {upload} = require('../middlewares/helper.file.upload')


router.patch('/tenant/document', authMiddleware, documentController.updateDocument)
.post('/upload/document', authMiddleware, upload.single('document'), documentController.uploadTenantDocument)
.get('/tenant/document/:documentId', authMiddleware, documentController.fetchSingleTenantDocument)
.get('/tenant/document', authMiddleware, documentController.fetchAllTenantDocument)

module.exports = router;