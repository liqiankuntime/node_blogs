const queryString = require('querystring');
const {
    handleBlogRouter,
    handleUserRouter
} = require('./src/router');
const {set, get } = require('./src/db/redis');
const { access } = require('./src/utils/log');

const getCookieExpires = () => {
    let d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    return d.toGMTString();
}
//session 数据
let SESSION_DATA = {};


//获取post data
function getPostData(req) {
    return new Promise( (resolve, reject) => {
        if(req.method != 'POST'){
            resolve({});
            return;
        }
        if(req.headers['content-type'] != 'application/json'){
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if(!postData){
                resolve({});
                return;
            };
            resolve( JSON.parse(postData) );
        })
    })
}

const serverCallback = (req, res) => {
    //记录 access 的日志
    access(`${req.method} <--> ${req.url} <--> ${req.headers['user-agent']} <--> ${Date.now()}`)


    //设置返回格式 JSON
    res.setHeader("Content-type", 'application/json');

    //获取path
    let url = req.url;
    req.path = url.split('?')[0];

    //处理query
    req.query = queryString.parse(url.split('?')[1]);
    console.log('queryy::', req.query)
    //解析 cookie
    req.cookie = {};
    let cookieStr = req.headers.cookie || '';
    req.cookie = queryString.parse(cookieStr, ';');
    console.log('cookieStr:', cookieStr, req.cookie)

    //解析session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    //redis版的 session
    console.log('userId:>>', userId, req.cookie)
    if(!userId){
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        set(userId, {})
    }
    req.sessionId = userId;
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }
        // console.log('req.session ', req.session)

        // 处理 post data
        return getPostData(req)
    }).then( postData => {
        req.body = postData;
        //处理博客路由
        const blockResult =  handleBlogRouter(req, res);
        console.log('blockResult:>', blockResult, needSetCookie);
        if(blockResult){
            blockResult.then(blockData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end( JSON.stringify(blockData) );
            })
            return;
        }

        //处理user路由
        const userResult = handleUserRouter(req, res);
        console.log('userRee:', userResult, needSetCookie);
        if(userResult){
            userResult.then( userData => {
                console.log('appUser:', userData, needSetCookie, userId);
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                
                }
                res.end(JSON.stringify(userData))
            })

            return;
        }

        //没有命中路由则返回 404
        res.writeHead(404, {"Content-type": 'text/plain'})//返回纯文本
        res.write("404 NOT FOUND! \n");
        res.end();
    })
}

module.exports = serverCallback;
