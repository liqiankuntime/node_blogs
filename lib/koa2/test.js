const Koa = require('./like-koa2');

const app = new Koa();

app.use( async function(ctx, next){
    console.log('第一层开始！', ctx)
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} -- ${ctx.url} -- ${rt}`)
    console.log('第一层结束！', ctx)
} )

app.use( async function(ctx, next){
    console.log('第二层开始！', ctx)
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`ms -- ${ms}`)
    console.log('第二层结束！', ctx)
} )

app.use( async function(ctx, next){
    console.log('第三层开始！', ctx)
    // ctx.body = 'hello word!'
    ctx.res.end('this is like koa2');
    console.log('第三层结束！', ctx)
} )

app.listen(3000, () => {
    console.log('listen at port 3000')
})