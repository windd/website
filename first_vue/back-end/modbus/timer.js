var schedule = require('node-schedule');

function scheduleCronstyle(){
    schedule.scheduleJob('1-60 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());
    }); 
}

scheduleCronstyle()