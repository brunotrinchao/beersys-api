const dbConfig = require('../config/database');

const Sequelize = require('sequelize');


const connection = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASS, {
        host: dbConfig.DB_HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        // pool: {
        //     max: dbConfig.pool.max,
        //     min: dbConfig.pool.min,
        //     acquire: dbConfig.pool.acquire,
        //     idle: dbConfig.pool.idle

        // }
    });

// connection.authenticate().then(() => {

//     console.log('Conectado ao banco de dados', dbConfig);

// }).catch((error) => {

//     console.error('Não foi possível conectar ao banco de dados', error, dbConfig);

// });

// try {
//     connection.authenticate();
//     console.log('Conectado ao banco de dados');
// } catch (error) {
//     console.error('Não foi possível conectar ao banco de dados', error);
// }

module.exports = connection; 