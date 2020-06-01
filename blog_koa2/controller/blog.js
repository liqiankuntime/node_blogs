const { exec } = require('../db/mysql');
const xss = require('xss');
//1、获取列表
/**
 * 
 * @param {*} author 
 * @param {*} keyword 
 */
const getList = async (author='', keyword='') => {

    let sql = "select * from blogs where 1=1 ";
    if(author){
        sql += `and author = "${author}" `;
    };
    if(keyword){
        sql += `and title like %"${keyword}"% `;
    }
    sql += 'order by createtime desc';
    return await exec(sql);
}

//2、获取详情
/**
 * 
 * @param {*} id 
 */
const getDetail = async (id='') => {
    let sql = `select * from blogs where id=${id} `
    const rows = await exec(sql);
    return rows[0];
    //对比下面的写法
    return await exec(sql).then(result => {
        return result[0];
    })
}

//3、新建一个博客
const newBlog = async (blogData ={}) => {
    console.log('blog::', blogData);
    const title = xss(blogData.title);
    const author = blogData.author;
    const content = xss(blogData.content);
    //blogData 是一个博客对象 
    //{title: '', content:'', authord: '', createTime: ''}

    let createtime = Date.now();
    //这里的${blogData.title} 外面不加引号，会报错
    let sql = `insert into blogs (title, author, content, createtime)
        values ('${title}', '${author}', '${content}', ${createtime})
    `
    console.log('newSql:', sql);

    const insertData = await exec(sql);
    return { id: insertData.insertId}
    //对比下面的写法
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
    return {
        id: 3, //标示新建博客，插入到数据表里面的ID
    }
}

//4、更新一个博客
/**
 * 
 * @param {*} id 更新博客的ID
 * @param {*} blogData 更新博客的内容
 */
const updateBlog = async (id, blogData={}) => {
    let sql = `update blogs set 
    title ='${blogData.title}', 
    content ='${blogData.content}' 
    where id =${id} `;

    const updateData = await exec(sql);
    if(updateData.affectedRows > 0){
        return true;
    }
    return false;
    //对比下面的写法
    return exec(sql).then( updateData => {
        if(updateData.affectedRows > 0){
            return true;
        }
        return false;
    } )
    return true;
}

//5、删除一个博客
/**
 * 
 * @param {*} id 要删除博客的ID
 */
const delBlog = async (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}' `;
    const deleData = await exec(sql);
    if(deleData.affectedRows >0){
        return true;
    };
    return false;
    //对比下面的写法
    return exec(sql).then( deleData => {
        if(deleData.affectedRows >0){
            return true;
        };
        return false;
    })
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}