const http = require('http');
const slice = Array.prototype.slice;



class LikeExpress {
    constructor(){
        this.routes = {
            all: [],
            get: [],
            post: []
        }

    }

    register(...param){
        console.log('param::', param, '0:',param[0]);
        let info = {};
        if( typeof param[0] === 'string' ){
            info.path = param[0];
            info.stack = param.slice(1);
        }else {
            info.path = '/';
            info.stack = [...param];
        };
        return info;
    }
    //注意视频的知识点 arguments 的传递参数方式
    use(...useParam){
        console.log('useParam::', useParam);
        const info = this.register(...useParam);
        console.log('userInfo::', info);
        this.routes.all.push(info);
    }
    get(...getParam){
        console.log('getParam::', getParam);
        const info = this.register(...getParam);
        this.routes.get.push(info);

        console.log('getlast:', this.routes);
    }
    post(...postParam){
        console.log('postParam::', postParam);
        const info = this.register(...postParam);
        this.routes.post.push(info);
    }

    math(method, url){
        let stack = [];
        console.log('math::', method, url);
        if(url === '/favicon.ico'){
            return stack;
        }
        
        let curRoutes = [];
        curRoutes = curRoutes.concat(this.routes.all);
        curRoutes = curRoutes.concat(this.routes[method]);
        console.log('curRoute::', curRoutes, url);
        curRoutes.forEach( routeInfo => {
            if( url.indexOf(routeInfo.path) === 0 ){
                stack = stack.concat(routeInfo.stack);
            }
        })
        return stack;
    }

    //next() 实现机制
    handle(req, res, stack){
        const next = ()=> {
            const middleWare = stack.shift();
            console.log('handle::', middleWare, stack)
            if(middleWare){
                middleWare(req, res, next);
            }
        };
        next();
    }
    callback(){
        return (req, res) => {
            res.json = (data) => {
                res.setHeader("Content-type", "application/json");
                res.end( JSON.stringify(data) );
            };
            const url = req.url;
            const method = req.method.toLowerCase();
            const resultList = this.math(method, url);
            this.handle(req, res, resultList);
        }
    }
    listen(...args){
        console.log('listen::', args);
        const server = http.createServer(this.callback());
        server.listen(...args);
    }
}

//工厂函数 模式
module.exports = ()=> {
    return new LikeExpress();
}


