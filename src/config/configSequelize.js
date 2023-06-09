require('dotenv').config();

module.exports = {
  "development": {
    "username": 'sql10624908', // process.env.DB_USER,
    "password": 'mPw883ZUCD', // process.env.DB_PASS,
    "database": 'sql10624908', //process.env.DB_NAME,
    "host": 'sql10.freemysqlhosting.net', //process.env.DB_NAME,
    "port": 3306, // process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": true
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": true
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": true
  }
}
