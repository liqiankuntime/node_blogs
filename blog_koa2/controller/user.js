
const { exec, escape } = require('../db/mysql');
const { genPassword }= require('../utils/cryp');
//1、登陆校验
const login = async (username, password) => {
    username = escape(username);
    password = genPassword(password);
    password = escape(password);
    const sql = `
        select username, realname from users where username=${username} and password= ${password}
    `
    console.log('ssql:', sql);
    const loginResult = await exec(sql);
    return loginResult[0] || {};
    //对比下面的写法
    return exec(sql).then( loginResult=> {
        return loginResult[0] || {};
    } )
}

module.exports = {
    login
}