let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);

module.exports = {
    connPool (sql, val, cb) {
        console.log(val)
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, rows) => {
                console.log(rows)
                if (err) {
                    console.log(err);
                }

               // console.log(a);

                cb(rows);

                conn.release();
            });
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = {code, msg, data};

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};