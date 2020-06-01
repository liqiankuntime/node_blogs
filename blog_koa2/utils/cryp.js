const crypto  = require('crypto');

//密匙
const SECRET_KEY = "muZi$_#TechnologY$";

//md5加密
function md5(content){
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');//digest('hex')转化为6进制
}

//加密函数

function genPassword(password){
    const str = `$pas=${password}&*last=${SECRET_KEY}`;
    return md5(str);
}

module.exports={
    genPassword
}