const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

//创建连接对象
const connect = mysql.createConnection(MYSQL_CONF);

//开始连接
connect.connect();

//执行查询的函数
function exec(sql) {
    return new Promise((resolve, reject) => {
        connect.query(sql, (err, response) => {
            if(err){
                reject(err);
                return;
            };
            resolve(response);
        })
    })
    
}

module.exports={
    exec,
    escape: mysql.escape
}