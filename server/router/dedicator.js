const express = require('express');
const router = express.Router();
const db  = require('../utils/mysql');
// 查询公司列表
router.post('/list',function(req, res){
    const data = req.body;
    const filterMenu = ['dedicator_name'];

    let filter = db.createLike(filterMenu,data);
    //console.log('filter = ',filter);
    const sql = 'select * from dedicator '+ filter +'limit '  +(data.start - 1)* data.limit + ',' + data.limit;
    console.log('sql = ',sql);
    db.exec(sql,null,function(err1,res1){
        //console.log('result=',result);
        const sql2 = 'select count(*) from dedicator;';
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
    let sql = "INSERT INTO `dedicator` VALUES (";
    const menu = [
        'ip','dedicator_name','dedicator_birthday',
        'dedicator_sex','dedicator_hometown',
        'dedicator_companys','dedicator_position','dedicator_signs',
        'dedicator_blogs','dedicator_git','create_time','update_time',
        'note'
    ];

    sql += db.createAdd(menu,data) + ')';
    console.log('sql = ',sql)
    db.exec(sql,function(err,data){
        console.log('data = ',data)
        if(err){
            console.log('err = ', err);
            res.send({
                msg: err.sqlMessage,
                code: err.sqlState
            })
        }else{
            res.send({
                msg: '添加公司成功。',
                code: 200
            })
        }

    });

});
// 添加公司
router.post('/edit',function(req, res){
    const data = req.body;
    let sql = "update dedicator set ";
    const menu = [
        'dedicator_name','dedicator_birthday',
        'dedicator_sex','dedicator_hometown',
        'dedicator_companys','dedicator_position','dedicator_signs',
        'dedicator_blogs','dedicator_git','create_time','update_time',
        'note'
    ];
    for(var s in menu){
        let value;
        if(data[menu[s]]){
            value =   menu[s] +' = \''+ data[menu[s]]  + '\',';
            sql +=  value ;
        }
    }
    sql = sql.slice(0,sql.length - 1);
    sql += ' where id = ' + data.id;
    console.log('sql = ',sql)
    db.exec(sql,function(err,data){
        console.log('data = ',data)
        if(err){
            console.log('err = ', err);
            res.send({
                msg: err.sqlMessage,
                code: err.sqlState
            })
        }else{
            res.send({
                msg: '修改招聘信息成功。',
                code: 200
            })
        }

    });

});
// 删除公司
router.delete('/del/:id',function(req, res){
    const data = req.params;
    console.log('query = ',req.query)
    const companyId = data.id;
    let sql = 'DELETE FROM dedicator WHERE id = '+ companyId;
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
    let sql = 'select * FROM dedicator WHERE id = '+ companyId;
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