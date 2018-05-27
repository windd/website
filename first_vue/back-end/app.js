let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let session = require('express-session');
let router = require('./routes/router');

let modbusNet=require('./modbus/modbusNet')



let port = process.env.PORT || 1237;
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'fuckupig',
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true,
}));

app.use(router);

app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
});