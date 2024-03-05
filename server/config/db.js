const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_DEV_HOST,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    port: process.env.DB_DEV_PORT,
    database: process.env.DB_DEV_DATABASE
});

// const connection = mysql.createConnection({
//     host: process.env.DB_PROD_HOST,
//     user: process.env.DB_PROD_USER,
//     password: process.env.DB_PROD_PASSWORD,
//     port: process.env.DB_PROD_PORT,
//     database: process.env.DB_PROD_DATABASE
// });

module.exports = connection;





