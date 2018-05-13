let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}


module.exports = {
    // 获取站点列表
    fetchAll (req, res) {
        func.connPool(sql.queryAll, 'station', rows => {
            rows = formatData(rows);
            console.log(rows)
            res.json({code: 200, msg: 'ok', stationdata: rows});
        });
    },

   
};