require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.json());

const tenantRoutes = require('./src/app/routes/tenantRoutes');

app.use('/', tenantRoutes);
// app.use('/accont', tenantRoutes); // Tenant login route
// app.use('/tenant-activate', tenantRoutes);




const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`DocSend is running on port http://localhost:${PORT}`);
});

