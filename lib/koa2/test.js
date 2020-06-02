const Koa = require('./like-koa2');

const app = new Koa();

app.use( async function(ctx, next){
    console.log('第一层开始！')
    await next();
    const rt = ctx['X-Response-Time'];
    console.log(`${ctx.method} -- ${ctx.url} -- ${rt}`)
    console.log('第一层结束！')
} )

app.use( async function(ctx, next){
    console.log('第二层开始！')
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`ms -- ${ms}`)
    console.log('第二层结束！')
} )

app.use( async function(ctx, next){
    console.log('第三层开始！')
    // ctx.body = 'hello word!'
    ctx.res.end('this is like koa2');
    console.log('第三层结束！')
} )

app.listen(3000, () => {
    console.log('listen at port 3000')
})