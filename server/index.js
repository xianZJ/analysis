const express = require('express');
const app = express();

// 日志
const log4js = require('./utils/log');
const logger = log4js.getLogger()
log4js.useLogger(app, logger)

const company = require('./router/company');
const website = require('./router/website');

const router = express.Router();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('/public', express.static('public'))
app.use('/company',company);
app.use('/website',website);

const server = app.listen(3333, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
