require('dotenv').config();

module.exports = {
    // DB_HOST: process.env.DB_HOST,
    // DB_USER: process.env.DB_USER,
    // DB_PASS: process.env.DB_PASS,
    // DB_NAME: process.env.DB_NAME,
    // dialect: 'mysql',
    // define: {
    //     timestamp: true,
    //     underscored: true
    // }
    // {
        "development": {
            "username": process.env.DB_USER,
            "password": process.env.DB_PASS,
            "database": process.env.DB_NAME,
            "host": process.env.DB_HOST,
            "dialect": "mysql"
        },
        "test": {
            "username": process.env.DB_USER,
            "password": process.env.DB_PASS,
            "database": process.env.DB_NAME,
            "host": process.env.DB_HOST,
            "dialect": "mysql"
        },
        "production": {
            "username": process.env.DB_USER,
            "password": process.env.DB_PASS,
            "database": process.env.DB_NAME,
            "host": process.env.DB_HOST,
            "dialect": "mysql"
        }
        // }
}