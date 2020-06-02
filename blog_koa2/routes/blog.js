const router = require('koa-router')()

const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const loginCheck = require('../middleware/loginCheck');
const { SuccessModel, ErrorModel} = require('../model/resmodel');
router.prefix('/api/blog')//前缀·/users/bar

//1、增
router.post('/new', loginCheck, async (ctx, next) => {

    console.log('ctxx::', ctx, '<ctxend', ctx.request.body)
    //req.body.author = '马斯';//假的登陆人，待开发登陆时完善为真实数据
    let body = ctx.request.body
    body.author = ctx.session.username;

    const insertData = await newBlog(body);
    ctx.body = new SuccessModel(insertData, "创建成功！");
    return;
    //对比下面的写法
    const insertResult = newBlog(ctx.body);
    return insertResult.then(insertData=> {
        res.json( new SuccessModel(insertData, "创建成功！") );
        return;
    })
})
//2、删
router.post('/del', loginCheck, async (ctx, next) => {
    let id = ctx.query.id;
    let deleData = await delBlog(id, ctx.session.username);
    console.log('deleteData:', deleData);
    if(deleData){
        ctx.body = new SuccessModel(deleData, '删除成功');
        // res.json( new SuccessModel(deleData, '删除成功') );
        return; 
    }else{
        ctx.body = new ErrorModel(deleData, '删除失败');
        // res.json( new ErrorModel(deleData, '删除失败') );
        return;
    }

    //对比下面的写法
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
//3、改
router.post('/update', loginCheck, async (ctx, next) => {
    //req.body.author = '马斯';//假的登陆人，待开发登陆时完善为真实数据
    let id = ctx.query.id;
    ctx.body.author = ctx.session.username;
    let updateData = await updateBlog(id, ctx.body);
    console.log('updata::', updateData);
    if(updateData){
        ctx.body = new SuccessModel(updateData, '更新成功！');
        // res.json( new SuccessModel(updateData, '更新成功！'));
        return;
    }else {
        ctx.body = new ErrorModel(updateData, '更新失败！');
        // res.json( new ErrorModel(updateData, '更新失败！') );
        return;
    }

    //对比下面的写法
    let updateResult = updateBlog(id, req.bodsy);
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
//4、查
router.get('/list', async (ctx, next) => {
    console.log('1list::', ctx, '<1list', ctx.query)
    const query = ctx.query;
    let author = query.author || '';
    const keyword = query.keyword || '';
    console.log('resss::1', ctx.query, ctx.session)
    if(query.isadmin){
        //管理员界面
        console.log('resss::', ctx.session.username)
        if(!ctx.session.username){
            //未登陆
            // res.json( new ErrorModel('未登陆！') );
            ctx.body=  new ErrorModel('未登陆！')
            return;
        }
        //强制查询自己的博客
        author = ctx.session.username;
    }

    let listData = await getList(author, keyword);
    console.log('listData:', listData)
    ctx.body = new SuccessModel(listData, '查询成果！')
    return;
    //对比下面的写法
    let result = getList(author, keyword);
    return result.then(listData => {
        res.json(
            new SuccessModel(listData, '查询成果！')
        )
        // return  new SuccessModel(listData, '查询成果！');
    })
})

router.get('/detail', async (ctx, next) => {
    let id = ctx.query.id;
    let detailData = await getDetail(id);
    ctx.body = new SuccessModel(detailData, '查询成功！');
    return;
    // 对比下面的写法
    let detailResult = getDetail(id);
    return detailResult.then( detailData => {
        res.json(
            new SuccessModel(detailData, '查询成功！')
        );
        return;
    })

})

module.exports = router
