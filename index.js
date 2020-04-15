const http = require('http');



const server = http.createServer((require, response) => {
    response.writeHead(200, {'content-type': 'text/html'});
    response.end('<p>hello world </p>')
})

server.listen(3000, () => {
    console.log('listen at 3000 port');
})