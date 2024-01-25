const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/helper.auth');
const documentController = require('../controllers/documentController');
const shareDocumentController = require('../controllers/sharedocumentController');
const permissionController = require('../controllers/permissionController');
const {upload} = require('../middlewares/helper.file.upload')


router.patch('/tenant/document', authMiddleware, documentController.updateDocument)
.post('/tenant/document/share', authMiddleware, shareDocumentController.shareDocument)
.get('/tenant/document/share/staff', authMiddleware, shareDocumentController.fetchDocumentStaff)
.post('/tenant/upload/document', authMiddleware, upload.single('document'), documentController.uploadTenantDocument)
.get('/tenant/document/:documentId', authMiddleware, documentController.fetchSingleTenantDocument)
.delete('/tenant/document/:id', authMiddleware, documentController.deleteDocument)
.get('/tenant/search/document', authMiddleware, documentController.searchDocument)
.get('/tenant/document', authMiddleware, documentController.fetchAllTenantDocument)
.patch('/tenant/document/permission', authMiddleware, permissionController.updateStaffDocumentPermission)
.delete('/tenant/document/staff/permission', authMiddleware, permissionController.removeStaffDocumentPermission)

module.exports = router;
