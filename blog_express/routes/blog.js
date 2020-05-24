const express = require('express');
const router = express.Router();
const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const loginCheck = require('../middleware/loginCheck');
const { SuccessModel, ErrorModel} = require('../model/resmodel');


router.post('/new', loginCheck, (req,res, next) => {
    //req.body.author = '马斯';//假的登陆人，待开发登陆时完善为真实数据
    req.body.author = req.session.username
    const insertResult = newBlog(req.body);
    return insertResult.then(insertData=> {
        res.json( new SuccessModel(insertData, "创建成功！") );
        return;
    })
})

router.post('/del', loginCheck, (req,res, next) => {
    let id = req.query.id;
    let deleteResult = delBlog(id, req.session.username);//'马斯');
    console.log('deee::', id);
    return deleteResult.then( deleData => {
        console.log('deleteData:', deleData);
        if(deleData){
            res.json( new SuccessModel(deleData, '删除成功') );
            return; 
        }else{
            res.json( new ErrorModel(deleData, '删除失败') );
            return;
        }
    })
})


router.post('/update', loginCheck, (req,res, next) => {
    //req.body.author = '马斯';//假的登陆人，待开发登陆时完善为真实数据
    let id = req.query.id;
    req.body.author = req.session.username
    let updateResult = updateBlog(id, req.body);
    return updateResult.then( updateData => {
        console.log('updata::', updateData);
        if(updateData){
            res.json( new SuccessModel(updateData, '更新成功！'));
            return;
        }else {
            res.json( new ErrorModel(updateData, '更新失败！') );
            return;
        }
    })
})


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
    let id = req.query.id;
    let detailResult = getDetail(id);
    return detailResult.then( detailData => {
        res.json(
            new SuccessModel(detailData, '查询成功！')
        );
        return;
    })

})

module.exports = router;