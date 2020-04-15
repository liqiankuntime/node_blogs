const redis = require('redis');

// const redisClient = redis.createClient({
//     host:'127.0.0.1', 
//     port: 6379,
//     no_ready_check:true
// });
const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', (err) => {
    console.error('err:',err);
})

//测试设置值
redisClient.set('myname', 'liqkm', redis.print);
redisClient.get('myname', (err, val) => {
    if(err){
        console.error('inner:', err);
        return;
    }
    console.log('val:', val);

    redisClient.quit();
})


