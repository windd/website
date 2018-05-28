
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

    getYC (sockets) {
        TXbuff.writeUInt8(0x03,7)
        TXbuff.writeUInt8(0x00,10)
        TXbuff.writeUInt8(0x10,11)
        console.log(TXbuff)
        sockets[0].write(TXbuff)
    },
    dataSub(data){
        if(data.length>6){
            dataCon.addone(data)
        }
    },
    FZ(station,sockets){
        console.log(station)
        TXbuff.writeUInt8(0x05,7)
        TXbuff.writeUInt8(0xff,10)
        TXbuff.writeUInt8(0x00,11)
        if(sockets[0]!==undefined){
            sockets[0].write(TXbuff)
            return true
        }else{
            return false
        }
        
    }
};