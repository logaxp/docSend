const express = require('express');
const router = express.Router();


// require Template controller
const templateController = require('../controllers/templateController');
const authMiddleware = require('../middlewares/helper.auth');



router.post('/template/create', authMiddleware, templateController.createTemplate)


module.exports = router;
