const mysql = require ('mysql');

var pool = mysql.createPool({
    "user" : "bn_moodle",
    "password": "",
    "database": "bitnami_moodle",
    "host": "localhost",
    "port" : 3306
});

exports.pool = pool;