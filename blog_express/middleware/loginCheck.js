const { ErrorModal} = require('../model/resmodel');

module.exports = (req, res, next) => {
    console.log('check::', req.session.username)
    if(req.session.username){
        next();
        return;
    }
    res.json( new ErrorModal('未登陆！'))
}