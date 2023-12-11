const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions))


dotenv.config()

const app = express();

// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '500mb' }));

app.use(cors())
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))

const tenantRoutes = require('./src/app/routes/tenantRoutes');
const templateRoutes = require('./src/app/routes/templateRoutes');

app.use('/v1/api', tenantRoutes);
app.use('/v1/api', templateRoutes);




const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`DocSend is running on port http://localhost:${PORT}`);
});

