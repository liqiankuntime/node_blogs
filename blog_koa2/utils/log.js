const fs = require('fs');
const path = require('path');


function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs',fileName);
    let writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a' // append 追加
    });
    return writeStream;
}

//写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log){
    writeLog(accessWriteStream, log);
}
function writeLog(writeStream, log){
    writeStream.write(log + '\n');
}

module.exports = {
    access  
}