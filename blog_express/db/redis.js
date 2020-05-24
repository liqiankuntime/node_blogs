const redis = require('redis');
const { REDIS_CONF }= require('../conf/db');

//创建客户端
const redisClient = redis.createClient(REDIS_CONF);
redisClient.on('error', (err) => {
    console.error('error:',err);
})

module.exports = redisClient;


// const redisClient = redis.createClient(REDIS_CONF);


// redisClient.on('error', (err) => {
//     console.error('error:',err);
// })

// function set(key, value) {
//     if(typeof value == 'object'){
//         value = JSON.stringify(value);
//     }
//     redisClient.set(key, value, redis.print);
// }
// function get(key) {
//     return new Promise((resolve, reject) => {
//         redisClient.get(key, (err, val)=>{
//             if(err){
//                 reject(err);
//                 return;
//             };
//             if(!val){
//                 resolve(null);
//             }else{
//                 try{
//                     //返回值有可能时json字符串，所以先尝试解析
//                     resolve(JSON.parse(val))
//                 }catch(ex){
//                     resolve(val)
//                 }
//             }
//         })
//     })
// }

// module.exports={
//     set,
//     get
// }