const express = require('express');
const router = express.Router();
const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel} = require('../model/resmodel');

router.get('/list', (req, res, next) => {
    let author = req.body.author || '';
    const keyword = req.body.keyword || '';
    console.log('resss::1', req.query, req.session)
    if(req.query.isadmin){
        //管理员界面
        console.log('resss::', req.session.username)
        if(!req.session.username){
            //未登陆
            res.json( new ErrorModel('未登陆！') );
            return;
        }
        //强制查询自己的博客
        author = req.session.username;
    }
    
    let result = getList(author, keyword);
    return result.then(listData => {
        res.json(
            new SuccessModel(listData, '查询成果！')
        )
        // return  new SuccessModel(listData, '查询成果！');
    })
})

router.get('/detail', (req, res, next) => {
    res.json({
        errorno: 0,
        data: 'detail content'
    })
})

module.exports = router;