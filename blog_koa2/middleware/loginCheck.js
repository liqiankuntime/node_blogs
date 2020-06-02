const { ErrorModal} = require('../model/resmodel');

module.exports = async (ctx, next) => {
    console.log('check::', ctx.session.username)
    if(ctx.session.username){
        await next();
        return;
    }
    ctx.body = new ErrorModal('未登陆！')
    // res.json( new ErrorModal('未登陆！'))
}