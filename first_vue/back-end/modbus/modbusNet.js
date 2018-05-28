let net = require('net');
let modbus=require('./modbus')

var PORT = 1238;
var server = net.createServer();
server.listen(PORT,()=>{
    console.log('TCPServer listening on '  + ':' + server.address().port);
});

var sockets=[]
var timer

module.exports = sockets

server.on('connection', function(sock) {
    
    console.log('CONNECTED: ' +sock.remoteAddress +':'+ sock.remotePort);
    sockets.push(sock)

    sockets[0].on('data',function(data){
        console.log(data)
        modbus.dataSub(data)
    })
    
    sockets[0].on('end',function(){
        sockets.pop(sock)
        console.log('end')
        clearInterval(timer)
        timer=undefined
    })

    if(timer===undefined){
    timer=setInterval(function(){
        //console.log(sockets.length)
        if(sockets){
          modbus.getYC(sockets)
        } else {
            console.log('stop')
            timer.cancel()
        }
    },5000)
  }

})

