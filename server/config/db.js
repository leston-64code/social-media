const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'leston@mite987',
    port: 3306,
    database: 'social_media'
});

module.exports = connection;





