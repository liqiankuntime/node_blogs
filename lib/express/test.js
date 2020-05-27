const express = require('./like-express');

//本次 http请求创建的实例
const app = express();


app.use((req, res, next) => {
    console.log('http请求开始！');
    next();
})

app.use((req, res, next) => {
    console.log('假设在处理cookie');
    req.cookie = {
        userId: 'aert'
    }
    next();
})

app.use('/api', (req, res, next) => {
    console.log('在处理api这个接口');
    next();
})

//模拟登陆验证
function loginCheck(req, res, next){
    setTimeout(() => {
        console.log('模拟登陆成功!');
        next();
    })
}


app.use('/api/get-cookie', (req, res, next) => {
    console.log('路由：/api/get-cookie的处理');
    res.json({
        errno: 0,
        data: req.cookie
    });
    next();
})

app.get('/api/get-cookie', loginCheck,(req, res, next) => {
    console.log('get >路由：/api/get-cookie的处理');
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.listen(3000, () => {
    console.log('连接成功了！')
})