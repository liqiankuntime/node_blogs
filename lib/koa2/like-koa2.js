const http = require('http');


//组合中间键
function compose(middlewareList){
    return function(ctx){
        function dispatch(i){
            const fn = middlewareList[i];
            try{
                return Promise.resolve( fn(ctx, dispatch.bind(null, i+1)) )
            }catch(err){
                return Promise.reject(err);
            }
        }
        return dispatch(0);
    }
}

class LikeKoa2 {
    constructor(){
        this.middlewareList = [];
    }

    use(fn){
        console.log('fnfn:', fn);
        this.middlewareList.push(fn);
        return this;
    }
    callback(){
        const fn = compose(this.middlewareList);
        return (req, res)=>{
            const ctx = this.createContext(req, res);
            return this.handleRequest(ctx, fn);
        }
    }
    handleRequest(ctx, fn){
        fn(ctx);
    }
    createContext(req, res){
        const ctx = {
            req, 
            res
        };
        ctx.query = req.query;
        return ctx;
    }
    listen(...args){
        const server = http.createServer(this.callback());
        server.listen(...args);
    }
}

module.exports = LikeKoa2;