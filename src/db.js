const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:process.env.DB_PORT,
    waitForConnections: true,
});

// connection.connect((error) => {
//     if (error) throw error;
//     console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`);
// });

module.exports = connection;