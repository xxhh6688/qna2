const mysql = require("mysql");
const dbConfig = require("./db.config.js");



var pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    connectionLimit: 10
});

var query = function (sql, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = undefined;
    }
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, options, function (err, results, fields) {
                callback(err, results, fields);
            });
            conn.release();
        }
    });
};

module.exports = query;