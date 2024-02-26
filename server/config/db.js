const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'leston@mite987',
    port: 3306,
    database: 'social_media'
});
// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'leston@mite987',
//     port: 3306,
//     database: 'social_media',
//     waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

module.exports = connection;





