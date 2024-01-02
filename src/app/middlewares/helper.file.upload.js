const multer = require('multer');
const path = require('path')
const dotenv = require('dotenv');

dotenv.config();


/*
* Hendle Folder creation and File upload
*/ 

const storageDir = process.env.CUSTOM_PDF_TEMPLATE_STORAGE_LOCATION || '/';
const appName = process.env.APP_NAME || 'docsend';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, storageDir)
    },
    filename: function(req, file, cb){
        const suffix = appName;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, suffix + '-' +uniqueSuffix + ext);
        // cb(null, file.fieldname + '-' +uniqueSuffix + ext);
    }
});


// const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = {
    upload
}

