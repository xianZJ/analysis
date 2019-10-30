const express = require('express');
const router = express.Router();
const db  = require('../utils/mysql');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const xlsx = require('node-xlsx')
let _path = path.resolve(__dirname)

console.log('_path',path);

const writeTpl = function(datas,callback){
    const data = JSON.parse(JSON.stringify(datas))
    console.log('datas =  ', data)
    const sheetData = [{
        name:'招聘行业末班',
        data: [
            _.map(data,function(item){
                return item.name
            })
        ]
    }]
    const buffer = xlsx.build(sheetData);
    // 定义表格存放路径
    fs.writeFile(path.resolve(__dirname,'../public/recruitTpl.xlsx'), buffer, 'binary',function(err){
        if(err){
            console.log(err);
        }else{
            callback && callback()
        }
    });
}
router.get('/',function(req, res){

    fs.access(path.resolve(__dirname,'../public/recruitTpl.xlsx'),function(err){
        if(err){
            console.log("文件不存在,生成文件。")
            var sql  = "select \n" +
                "COLUMN_COMMENT name\n" +
                "FROM\n" +
                "INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='recruit'"
            db.exec(sql,function(err,data){
                console.log('data = ',data);
                writeTpl(data,function(){
                    res.json({
                        url:'http:localhost:9527/api/public/recruitTpl.xlsx',
                        msg:''
                    })
                })
            })
        }else{
            res.json({
                url:'http:localhost:9527/api/public/recruitTpl.xlsx',
                msg:''
            })
            // 此处为直接下载文件
        //     res.set({
        //         'Content-Type': 'application/octet-stream',
        //         'Content-Disposition': 'attachment; filename=' + 'e-router'+'.xlsx',
        //     });
        //     fs.createReadStream(path.resolve(__dirname,'../public/recruitTpl.xlsx')).pipe(res);
         }
    })
});
module.exports = router;
