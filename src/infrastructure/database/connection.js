
require('dotenv').config({path: '../.env'});

const { CI_DB_HOST, CI_DB_USERNAME, CI_DB_PASSWORD, CI_DB_NAME, CI_DB_PORT } = process.env;


module.exports = {

    development: {
        databases: {
            rest: {
                database: CI_DB_NAME,
                username: CI_DB_USERNAME,
                password: CI_DB_PASSWORD,
                host: CI_DB_HOST,
                port: CI_DB_PORT,
                logging: false,
                pool: {
                    max: 151,
                    min: 0,
                    acquire: 60000,
                    idel:10000,
                },
                dialect: 'mysql',
            },
        },
    },

    production: {
        databases: {
            rest: {
                database: CI_DB_NAME,
                username: CI_DB_USERNAME,
                password: CI_DB_PASSWORD,
                host: CI_DB_HOST,
                port: CI_DB_PORT,
                logging: false,
                pool: {
                    max: 151,
                    min: 0,
                    acquire: 60000,
                    idel:10000,
                },
                dialect: 'mysql',
            },
        },
    }

};

