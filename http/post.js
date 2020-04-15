const http = require('http');
const queryString = require('querystring');


const server = http.createServer((req, res) => {

    if(req.method == 'POST'){
        //请求的数据格式
        console.log('type:', req.headers['content-type']);
        //接受数据
        let postData = '';
        req.on('data', chunk=> {
            console.log('chunk::', chunk.toString());
            postData += chunk.toString();
        });

        //接受数据结束时出发的方法
        req.on('end', () => {
            console.log('end::', postData);
            res.end('hello word')
        })

    }
})

server.listen(8000);
console.log('listen OK!')