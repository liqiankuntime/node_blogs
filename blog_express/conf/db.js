const env = process.env.NODE_ENV //全局环境参数

let MYSQL_CONF ={};
let REDIS_CONF = {};
//配置
if(env === 'dev'){
    //mysql
    MYSQL_CONF={
        host: 'localhost',
        user: 'root',
        password: 'lqk869653',
        port: '3306',
        database: 'myblog'
    };
    //redis
    REDIS_CONF={
        host: '127.0.0.1',
        port: 6379
    }
}

if(env === 'production'){
    MYSQL_CONF={
        host: 'localhost',//线上数据库的地址
        user: 'root',
        password: 'lqk869653',
        port: '3306',
        database: 'myblog'
    };
    //redis
    REDIS_CONF={
        host: '127.0.0.1',
        port: 6379
    }
}
module.exports={
    MYSQL_CONF,
    REDIS_CONF
}