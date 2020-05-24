const { ErrorModal} = require('../model');

module.exports = (req, res, next) => {
    if(req.session.username){
        next();
        return;
    }
    res.json( new ErrorModal('未登陆！'))
}