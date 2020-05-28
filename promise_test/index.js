const fs = require('fs');
const path = require('path');

/**
 * path.resolve(__dirname, filename, textname);
 * @param {*} __dirname:当前这个文件的目录  
 * @param {*} filename: 要找的文件所在的文件夹名称
 * @param {*} textname: 目标文件的名称
 */


//一：回调方法解决异步
// function getFileContent(fileNmae, callBack) {
//     const fullFileName = path.resolve(__dirname, 'files', fileNmae);
//     fs.readFile(fullFileName, (err, data) => {
//         //data默认是二进制的形式
//         if(err) return console.error(err);
//         callBack && callBack( JSON.parse(data.toString()) );
//     })
// }
// getFileContent('a.json', (aData) => {
//     console.log('a data:', aData);
//     getFileContent(aData.next, (bData) => {
//         console.log('b data:', bData);
//         getFileContent(bData.next, (cData) => {
//             console.log('c data:', cData );
//         })
//     })
// })

//promise 方法解决异步的问题
function promiseGetFileContent(fileName){
    const fileFullName = path.resolve(__dirname, 'files', fileName);
    return new Promise((resolve, reject) => {
        fs.readFile(fileFullName, (err, data)=> {
            if(err){
                return reject(err);
            }
            resolve( JSON.parse(data.toString()) );
        })
    })
}
//二：promise 方法解决异步的问题
// promiseGetFileContent('a.json')
// .then( aData => {
//     console.log('promise>a data:', aData);
//     return promiseGetFileContent(aData.next)
// })
// .then( bData => {
//     console.log('promise>b data:', bData);
//     return promiseGetFileContent(bData.next);
// })
// .then( cData => {
//     console.log('promise>c data:', cData);
// })

//三： async await的方式解决异步
async function readFileName(){
    const aData = await promiseGetFileContent('a.json');
    console.log('aData:', aData);
    const bData = await promiseGetFileContent(aData.next);
    console.log('bData:', bData);
    const cData = await promiseGetFileContent(bData.next);
    console.log('cData:', cData);
}
readFileName();
//async await 的总结：
//1、await后面可以追加promise对象，获取resolve的值
//2、await必须包裹在async函数里面
//3、async 函数执行返回的也是一个promise对象
//4、try-catch可以截获promise中reject的值