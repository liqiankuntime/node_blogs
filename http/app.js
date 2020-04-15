const http = require('http');
const query = require('querystring');


const server = http.createServer((req, res) => {

    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const queryData = query.parse(url.split('?')[1]);

    //设置返回格式 为JSON格式,通知客户端以什么样的格式去解析
    res.setHeader('Content-type', 'application/json');

    //根据不同的请求返回数据
    const resData = {
        method,
        url,
        path,
        queryData
    }
    if(method == 'GET'){

        res.end(JSON.stringify(resData));
    }else if(method == 'POST'){
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });

        req.on('end', () => {
            resData.postData = postData;
            res.end( JSON.stringify(resData) );
        })
    }


});

server.listen(8000);