const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// 日志
const log4js = require('./utils/log');
const logger = log4js.getLogger()
log4js.useLogger(app, logger)

const company = require('./router/company');
const recruit = require('./router/recruit');
const topic = require('./router/topic');
const dedicator = require('./router/dedicator');
const download = require('./router/download');
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
// 静态资源
app.use('/public', express.static('public'))
// 公司信息
app.use('/company',company);
// 招聘信息
app.use('/recruit',recruit);
// 知识点信息
app.use('/topic',topic);
// 作者信息
app.use('/dedicator',dedicator);
// 公司信息
app.use('/download',download);

const server = app.listen(3333, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})