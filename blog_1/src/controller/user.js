
const { exec, escape } = require('../db/mysql');
const { genPassword }= require('../utils/cryp');
//1、登陆校验
const login = (username, password) => {
    username = escape(username);
    password = genPassword(password);
    password = escape(password);
    const sql = `
        select username, realname from users where username=${username} and password= ${password}
    `
    console.log('login::', username, password);
    console.log('ssql:', sql);
    return exec(sql).then( loginResult=> {
        console.log('loginResult:', loginResult);
        return loginResult[0] || {};
    } )
}

module.exports = {
    login
}