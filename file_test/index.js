const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'text.txt');

//1、读取文件
// fs.readFile(fileName, (err, data)=> {
//     if(err) return err;
//     console.log('cosntent:', data.toString());
// });

// 2、写入文件
// let content = '这是往文件里写入的东西\n';
// fs.writeFile(fileName, content, {flag: 'a'}, err=> console.log(err));

//3、判断文件是否存在
// fs.exists(fileName, (exists)=>console.log('exist:', exists))