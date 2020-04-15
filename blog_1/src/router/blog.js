const { 
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel} = require('../model/resmodel');

//统一的登陆验证
function loginCheck(req) {
    console.log('rereq:', req.session)
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel('未登陆！')
        )
    }
}
const handleBlogRouter = (req, res) => {
    let id = req.query.id;
    
    //1、新建博客
    if(req.method == 'POST' && req.path == '/api/blog/new'){
        let loginCheckRes = loginCheck(req);
        if(loginCheckRes){
            //未登陆
            return loginCheckRes
        }
        req.body.author = '马斯';//假的登陆人，待开发登陆时完善为真实数据
        const insertResult = newBlog(req.body);
        return insertResult.then(insertData=> {
            return new SuccessModel(insertData, "创建成功！")
        })
    };

    //2、删除博客
    if( req.method == 'POST' && req.path == '/api/blog/del'){
        // let data = delBlog(id);
        let loginCheckRes = loginCheck(req);
        if(loginCheckRes){
            //未登陆
            return loginCheckRes
        }
        let deleteResult = delBlog(id, req.session.username);//'马斯');
        console.log('deee::', id);
        return deleteResult.then( deleData => {
            console.log('deleteData:', deleData);
            if(deleData){
                return new SuccessModel(deleData, '删除成功')
            }else{
                return new ErrorModel(deleData, '删除失败')
            }
        })
    }

    //3、更新一篇博客
    if(req.method == 'POST' && req.path=='/api/blog/update' ){
        // let data = updateBlog(id, req.body);
        let loginCheckRes = loginCheck(req);
        if(loginCheckRes){
            //未登陆
            return loginCheckRes
        }
        let updateResult = updateBlog(id, req.body);
        return updateResult.then( updateData => {
            console.log('updata::', updateData);
            if(updateData){
                return  new SuccessModel(updateData, '更新成功！')
            }else {
                return  new ErrorModel(updateData, '更新失败！')
            }
        })
        
    }

    //4、获取博客列表
    if(req.method == 'GET' && req.path == '/api/blog/list'){
        let author = req.body.author || '';
        const keyword = req.body.keyword || '';
        if(req.query.isadmin){
            //管理员界面
            const loginCheckRes = loginCheck(req);
            console.log('req:::',req.session, req.query, loginCheckRes)
            if(loginCheckRes){
                //未登陆
                return loginCheckRes;
            }
            //强制查询自己的博客
            author = req.session.username;
        }

        let result = getList(author, keyword);
        return result.then(listData => {
            console.log('listData:', listData);
            return  new SuccessModel(listData, '查询成果！');
        })

        // let listData = getList(req.query.author, req.query.keyword);
        // console.log('list:', new SuccessModel(listData, '查询成果！'));
        // return  new SuccessModel(listData, '查询成果！');
    };

    //5、获取博客详情
    if(req.method == 'GET' && req.path == '/api/blog/detail'){
        let detailResult = getDetail(id);
        return detailResult.then( detailData => {
            return new SuccessModel(detailData, '查询成功！')
        })

        let detailData = getDetail(id);
        return new SuccessModel(detailData, '查询成功！')
    };
}
module.exports = handleBlogRouter;