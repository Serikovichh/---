const mysql = require('mysql');

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'workshop_db',
    connectionLimit: 10 
});

module.exports = dbPool;
