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
        console.log(req.body)
        let start = moment(req.body.start).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(req.body.end).format('YYYY-MM-DD HH:mm:ss')
        let dataName=req.body.dataName
        func.connPool(sql.chart,  [dataName,'historydata',start,end], (rows,DName) => {
            let dataArray=new Array()
            let i
            for(i=0;i<rows.length;i++){
               dataArray[i]=rows[i][DName]
            }
            console.log(dataArray)
            res.json({code: 200, msg: 'ok', chartData: dataArray});
        });
    },

    addone (data) {

        query = 'INSERT INTO historydata(UA,UB) VALUES(?,?)';
        arr = [data[9],data[10]];
        console.log(arr)
        func.connPool(query, arr, rows => {
            return {code: 200, msg: 'done'}
        })
    }
};