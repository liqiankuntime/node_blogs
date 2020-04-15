const { SuccessModel, ErrorModel} = require('../model/resmodel');
const { 
    login
} = require('../controller/user');
const { set } = require('../db/redis');


const handleUserRouter = (req, res) => {
    //登陆接口
    if(req.method == 'POST' && req.path == '/api/user/login'){
        let {username, password} = req.body;
        // let {username, password} = req.query;
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
                    //同步到redis中
                    console.log('user::', req.cookie, req.query,req.sessionId, req.session)
                    set(req.sessionId,req.session )
                    return new SuccessModel("登陆成功");
                };
                return new ErrorModel('登陆失败！')
            })
        }
    }

    //登陆验证的测试
    if(req.method == 'GET' && req.path == '/api/user/login-test'){
        if(req.session.username){
            return Promise.resolve(
                new SuccessModel({
                    session: req.session
                })
            )
        }
        return Promise.resolve(new ErrorModel('尚未登陆'))
    }
}

module.exports = handleUserRouter;
