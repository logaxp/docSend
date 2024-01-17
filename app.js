const dotenv = require('dotenv');
const express = require('express');
const requestIp = require('request-ip');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

dotenv.config()

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions))



const app = express();
// app.use(express.static('src/interfaces/views/public'));
// Set Templating Engine
// app.use(expressLayouts)
app.set('views', path.join(__dirname, 'src/interfaces/views'));
app.set('view engine', 'ejs');


app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/pdf' }));

// Middleware to get client's IP address
app.use(requestIp.mw());

// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '500mb' }));


app.use('/editor/:documentId', express.static(path.join(__dirname, 'src/interfaces/views/public')));
app.use('/editor/:documentId', express.static(path.join(__dirname, 'templates/custom/pdf')));
//C:\Users\TENE\Documents\Node Project\docsend\templates
app.get('/editor/:documentId', (req, res) => {
    const { documentId } = req.params;

    res.render('pdf-editor-ui', {documentId});
});


const tenantRoutes = require('./src/app/routes/tenantRoutes');
const templateRoutes = require('./src/app/routes/templateRoutes');
const staffRoutes = require('./src/app/routes/userRoutes');
const documentRoutes = require('./src/app/routes/documentRoutes');

app.use('/v1/api', tenantRoutes);
app.use('/v1/api', templateRoutes);
app.use('/v1/api', staffRoutes);
app.use('/v1/api', documentRoutes);




const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`DocSend is running on port http://localhost:${PORT}`);
});

