const express = require('express');
const router = express.Router();
const { SuccessModel, ErrorModel} = require('../model/resmodel');
const { 
    login
} = require('../controller/user');


router.post('/login', (req, res, next) => {
    let { username, password} = req.body;
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


router.get('/session-test', (req, res, next) => {
    const session = req.session;
    if(session.viewNum == null){
        session.viewNum = 0;
    }
    session.viewNum++;
    res.json({
        viewNum: session.viewNum
    })
})

module.exports= router;