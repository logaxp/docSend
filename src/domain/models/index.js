'use strict';

const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

dotenv.config();

const config = require('../../infrastructure/database/connection')[process.env.NODE_ENV || 'development'];

const db = {};

// Initialize Sequelize instances for each database
const databases = Object.keys(config.databases);
for (const database of databases) {
    const dbPath = config.databases[database];
    db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
}

// Load database models
databases.forEach(database => {
    fs.readdirSync(__dirname)
        .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
        .forEach(file => {
            const model = require(path.join(__dirname, file))(db[database], Sequelize.DataTypes);
            db[model.name] = model;
        });
});

// Associate models if they have an 'associate' method
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = Sequelize;
db.Sequelize = Sequelize;

module.exports = db;
