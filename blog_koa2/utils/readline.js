const fs = require('fs');
const path = require('path');
const readline = require('readline');
//获取文件路径
const filename = path.join(__dirname, '../', '../', 'logs', 'access.log');
//创建 read stream
const readStream = fs.createReadStream(filename);
//创建readline对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0;
let sum = 0;
rl.on('line', (lineData) => {
    if(!lineData){
        return;
    }
    if(lineData.split(' <--> ')[2].includes('Chrome')){
        chromeNum++;
    }
    sum++;
})
rl.on('close', () => {
    console.log('chrome rate:', chromeNum/sum);
})