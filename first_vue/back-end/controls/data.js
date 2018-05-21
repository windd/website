let sql = require('../sql/sql');
let moment = require('moment');
let func = require('../sql/func');

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.Create_Time).format('YYYY-MM-DD HH:mm:ss');
        return Object.assign({}, row, {Create_Time: date});
    });
}


module.exports = {
    // 获取实时数据
    lastest (req, res) {
        func.connPool(sql.lastest, 'historydata', rows => {
            rows = formatData(rows);
            //console.log(rows)
            res.json({code: 200, msg: 'ok', latestdata: rows});
        });
    },

    history (req, res) {
        console.log(req.body)
        let start = moment(req.body[0]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(req.body[1]).format('YYYY-MM-DD HH:mm:ss')
        func.connPool(sql.Preiod, ['historydata',start,end], rows => {
            rows = formatData(rows);
            console.log(rows)
            res.json({code: 200, msg: 'ok', historydata: rows});
        });
    },

    chart (req, res) {
        func.connPool(sql.chart, 'historydata', rows => {
           // rows = formatData(rows);
            console.log(rows)
            res.json({code: 200, msg: 'ok', chartdata: rows});
        });
    },
};