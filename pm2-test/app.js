const http = require('http');


const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({
        errno: 0,
        mes: 'pm2 test learn'
    }))
});

server.listen(3000, () => {console.log('listen at port 3000')})