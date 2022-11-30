const mysql = require('mysql2');

export const connect = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'whale_restaurant',
    user: 'root',
    password: '',
    multipleStatements: true
});
