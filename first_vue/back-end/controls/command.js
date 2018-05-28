
let moment = require('moment');
let modbus = require('../modbus/modbus')
let sockets = require('../modbus/modbusNet')

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.Create_Time).format('YYYY-MM-DD HH:mm:ss');
        return Object.assign({}, row, { Create_Time: date });
    });
}


module.exports = {

    FZ(req, res) {
        console.log(req.body)
        let type = req.body.type
        let msg = req.body.msg
        if (type === 'fenzha' && msg === 'FFF0FE') {
            if (modbus.FZ('ganjinfen', sockets)) {
                res.json({ code: 200, msg: 'ok' });
            } else {
                res.json({ code: 100, msg: 'FZerror' });
            }
        }
    },
    HZ(req, res) {
        console.log(req.body)
        let type = req.body.type
        let msg = req.body.msg
        if (type === 'hezha' && msg === 'F0F0FE') {
            res.json({ code: 200, msg: 'ok' });
        } else {
            res.json({ code: 100, msg: 'HZerror' });
        }
    },

};