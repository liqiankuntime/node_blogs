const express = require('express');
//--------------------------------中间件------------
//本次http请求的实例
const app = express();

app.use((req, res, next) => {
    console.log('请求开始》 first:', req.method, req.url);
    next();
})

app.use((req, res, next) => {
    console.log('处理cookie的插件');
    req.cookie = {
        userId: '123abc'
    };
    next();
})

app.use((req, res, next) => {
    console.log('处理postdata的异步过程');
    setTimeout(() => {
        req.body={
           a: 100,
           b: 200
        }
        next()
    })
})

app.use('/api', (req, res, next) => {
    console.log('处理 api路由');
    next();
})


// app.get('/api', (req, res, next) => {
//     console.log( 'get api 路由');
//     next();
// })
app.post('/api', (req, res, next) => {
    console.log(' post api 路由')
    next();
})

function loginCheck(req, res, next) {
    setTimeout( ()=> {
        console.log('模拟登陆失败');
        res.json({
            errno: -1,
            msg: '登陆失败'
        })

        // console.log('模拟登陆成功');
        // next();
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log(' get api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next) => {
    console.log(' post api/get-post-data')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.use((req, res, next) => {
    console.log('处理 404');
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})


app.listen(3000, () => {
    console.log('server is running at port 3000')
})