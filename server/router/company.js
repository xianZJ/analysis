const express = require('express');
const router = express.Router();
const db  = require('../utils/mysql');
// 查询公司列表
router.post('/list',function(req, res){
   const data = req.body;
   const sql = 'select * from company limit ' +(data.start - 1)* data.limit + ',' + data.limit;
   console.log('sql = ',sql);
   db.exec(sql,null,function(err1,res1){
      //console.log('result=',result);
      const sql2 = 'select count(*) from company;';
      db.exec(sql2,null,function(err2,res2) {
         res.json({
            list: res1,
            pagination: {
               currentPage: Number(data.start),
               limit: Number(data.limit),
               total: Object.values(res2[0])[0]
            }
         })
      })
   },true)
});
// 添加公司
router.post('/add',function(req, res){
   const data = req.body;
   let sql = "INSERT INTO `company` VALUES (";
   const menu = [
       'id','name','regist_time','legal_person',
       'business_scope','registered_capital','official_website',
       'is_list','headqurters','industry',
       'employees','products','note',
       'modify_time','code','source',
   ];
   for(var s in menu){
      let value;
      if(data[menu[s]]){
         value = '\''+ data[menu[s]]  + '\',';
      }else{
         value = null + ',';
      }

      sql +=  value ;
   }
   sql = sql.slice(0,sql.length - 1);
   sql += ')'
   console.log('sql = ',sql)
   db.exec(sql,function(err,data){
      console.log('data = ',data)
      if(data){
         res.send({
            msg: '添加公司成功。',
            code: 200
         })
      }

   });

});
// 删除公司
router.delete('/del/:id',function(req, res){
   const data = req.params;
   const companyId = data.id;
   let sql = 'DELETE FROM company WHERE id = '+ companyId;
   console.log('sql',sql)
   db.exec(sql,null, function(err, data){
      if(!err){
         res.json({
            msg:'删除成功。',
            code: 200
         })
      }
   })
});
// 获取公司详情列表
router.get('/:id',function(req, res){
   const data = req.params;
   const companyId = data.id;
   let sql = 'select * FROM company WHERE id = '+ companyId;
   console.log('sql = ',sql);
   db.exec(sql,null, function(err, data){
      if(!err){
         res.json({
            data: data,
            code: 200
         })
      }
   })
});

module.exports = router;
