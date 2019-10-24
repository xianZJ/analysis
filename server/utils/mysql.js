const mysql = require('mysql');

const pool =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'kyeepass',
    database: 'world'
});

const db = {
    exec: function (sql, params, callback) {
        pool.getConnection(function (err, con) {
            if (err) {
                callback(err, null, null);
            } else {
                if (params === null || params.length == 0) {
                    con.query(sql, function (err, results, fields) {
                        con.release();
                        callback(err, results, fields);
                    })
                } else {
                    con.query(sql, params, function (err, results, fields) {
                        con.release();
                        callback(err, results, fields);
                    })
                }
            }
        });
    },
    //拼接模糊查询的函数 第一个为字典，第二个为数据
    createLike: function(menu, data){
        let str = "where ";
        console.log('menu',menu)
        console.log('data',data)
        for(var s in menu){
            if(data[menu[s]]){
                str += menu[s] + ' like \'%' + data[menu[s]] + '%\' and '
            }
        }
        if(str !== 'where '){
            return str.slice(0,str.length - 4)
        }else{
            return ""
        }
    },
    //拼接模糊查询的函数 第一个为字典，第二个为数据
    createAdd: function(menu, data){
        let str = " ";
        for(let s in menu){
            let value;
            if(data[menu[s]]){
                value = '\''+ data[menu[s]]  + '\',';
            }else{
                value = null + ',';
            }
            str +=  value ;
        }
        if(str){
            return str.slice(0, str.length - 1);
        }else{
            return "";
        }

    }
};

module.exports = db;
