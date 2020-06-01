const router = require('koa-router')()
const { SuccessModel, ErrorModel} = require('../model/resmodel');
const { 
    login
} = require('../controller/user');
router.prefix('/api/user')//前缀·/users/bar ctx.request.body

router.post('/login', async (ctx, next) => {
    let { username, password} = ctx.request.body;
    let loginData = await login(username, password);
    if(loginData.username){
        //登陆成功后设置前端返回的cookie
        // res.setHeader(
        //     "Set-Cookie", 
        //     `username=${loginData.username}; path='/'; httpOnly; expires=${getCookieExpires()}`
        // );
        ctx.session.username = loginData.username;
        ctx.session.realname = loginData.realname;
        ctx.body = new SuccessModel("登陆成功");
        return;
    };
    return new ErrorModel('登陆失败！')


    let checkResult = login(username, password);
        if(checkResult){
            return checkResult.then( loginData => {
                if(loginData.username){
                    //登陆成功后设置前端返回的cookie
                    // res.setHeader(
                    //     "Set-Cookie", 
                    //     `username=${loginData.username}; path='/'; httpOnly; expires=${getCookieExpires()}`
                    // );
                    req.session.username = loginData.username;
                    req.session.realname = loginData.realname;
                
                    res.json(
                        new SuccessModel("登陆成功")
                    ) 
                    return;
                };
                return new ErrorModel('登陆失败！')
            })
        }
})

router.get('/session-test', async function(ctx, next) {
    if(!ctx.session.viewCount){
        ctx.session.viewCount = 0;
    }
    ctx.session.viewCount++;
    ctx.body={
        errno: 0,
        viewCount:ctx.session.viewCount
    }
})

module.exports = router
