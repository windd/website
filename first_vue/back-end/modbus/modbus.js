
let moment = require('moment');

let dataCon=require('../controls/data')



function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.Create_Time).format('YYYY-MM-DD HH:mm:ss');
        return Object.assign({}, row, {Create_Time: date});
    });
}

var TXbuff=new Buffer([00,00,00,00,00,06,01,03,00,00,00,05])

module.exports = {
    // 获取YC
    getYC (sockets) {
        //console.log('getYC')
        sockets[0].write(TXbuff)
    },
    dataSub(data){
        if(data.length>6){
            dataCon.addone(data)
        }
    }
};