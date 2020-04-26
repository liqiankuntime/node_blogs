const { exec } = require('../db/mysql');
const xss = require('xss');
//1、获取列表
/**
 * 
 * @param {*} author 
 * @param {*} keyword 
 */
const getList = (author='', keyword='') => {

    let sql = "select * from blogs where 1=1 ";
    if(author){
        sql += `and author = "${author}" `;
    };
    if(keyword){
        sql += `and title like %"${keyword}"% `;
    }
    sql += 'order by createtime desc';
    console.log('list::', sql);
    return exec(sql);
    //先暂时返回假数据
    return [
        {
            id:1,
            title: '标题A',
            content: '内容A',
            createTime: '时间B'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: '时间B'
        }

    ]
}

//2、获取详情
/**
 * 
 * @param {*} id 
 */
const getDetail = (id='') => {
    let sql = `select * from blogs where id=${id} `
    return exec(sql).then(result => {
        console.log('sql:', result);
        return result[0];
    })
    return {
        id:1,
        author: 'lisi',
        title: '标题A',
        content: '内容A',
        createTime: '时间B'
    }
}

//3、新建一个博客
const newBlog = (blogData ={}) => {
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
    console.log('newBlog:', sql)
    return exec(sql).then(insertData => {
        console.log('cont:', insertData);
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
const updateBlog = (id, blogData={}) => {
    console.log('updata:', id, blogData);
    let sql = `update blogs set 
    title ='${blogData.title}', 
    content ='${blogData.content}' 
    where id =${id} `;
    return exec(sql).then( updateData => {
        console.log('updateData:', updateData);
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
const delBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}' `;
    return exec(sql).then( deleData => {
        console.log('dele:', deleData);
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