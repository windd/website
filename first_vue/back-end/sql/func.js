let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);

module.exports = {
    connPool (sql, val, cb) {
        console.log(sql,val)
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, rows) => {
//                console.log(sql)
                if (err) {
                    console.log(err);
                }

                //console.log(val[0]);

                cb(rows,val[0]);

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