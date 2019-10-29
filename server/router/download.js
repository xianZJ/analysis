const express = require('express');
const router = express.Router();
const db  = require('../utils/mysql');
const fs = require('fs');
const excelPort  = require('excel-export');
// const services = require('')



const writeTpl = function(datas,callback){
    //定义一个对象，存放内容
    var conf = {};
    //定义表头
    conf.cols = datas;
    conf.rows = datas;
    //生成表格
    var result = excelPort.execute(conf);
    // 定义表格存放路径
    fs.writeFile('tpl.xlsx', result, 'binary',function(err){
        if(err){
            console.log(err);
        }
        //callback && callback()
    });
}
router.post('/',function(req, res){
    var sql  = "select \n" +
        "COLUMN_COMMENT 备注\n" +
        "FROM\n" +
        "INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='recruit'"
    db.exec(sql,function(err,data){
        console.log('data = ',data);
        writeTpl(data[0],function(){
          res.json({
              data:'下载成功',
              msg:''
          })
        })

    })
});
module.exports = router;
