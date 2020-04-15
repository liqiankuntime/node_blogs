const mysql = require('mysql');

//创建连接对象
const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lqk869653',
    port: '3306',
    database: 'myblog'
});

//开始连接
connect.connect();

//执行查询
const sql = 'select * from users';
connect.query(sql, (err, response) => {
    if(err){
        console.log('err:', err);
        return;
    };

    console.log(response);
})
//关闭连接
connect.end();