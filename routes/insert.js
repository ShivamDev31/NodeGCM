/**
 * Created by shivamchopra on 24/03/16.
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gcm_test'
});

connection.connect();