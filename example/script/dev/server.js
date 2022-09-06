const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev');
const { koaDevMiddleware, koaHotMiddleware } = require('../../../dist/index');
const app = new Koa();
const compiler = webpack(webpackConfig);

app.use(koaDevMiddleware(compiler, {
    stats: {
        colors: true, // webpack编译输出日志带上颜色，相当于命令行 webpack –colors
        process: true
    }
}))

app.use(koaHotMiddleware(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000,
}))

// 本地mock
app.use(async (ctx, next) => {
    console.log("111111---------------")
    const reg = new RegExp(`api`);
    if (!reg.test(ctx.path)) {
        await next();
    } else {
        console.log("2222222---------------")
        // const emitContentPath = ctx.path.replace(`api/`, 'api/');
        // const mockFilePath = path.join('mock', emitContentPath);
        const emitContentPath = path.join('mock', ctx.path);
        const mockFilePath = path.resolve(__dirname, `../../${emitContentPath}.json`)
        console.log('mock data->', mockFilePath);
        // console.log(__dirname)
        // console.log(fs.existsSync(path.resolve(__dirname, `../../${mockFilePath}`)))
        console.log(fs.existsSync('/Users/zero/myproject/koa-mid-webpack/example/mock/api/perm/list.json'))
        if (fs.existsSync(mockFilePath)) {
            ctx.set('Content-Type', 'application/json; charset=UTF-8');
            ctx.body = fs.readFileSync(mockFilePath, 'utf-8');
        } else {
            await next();
        }
    }
});

app.listen(9999, () => {
    console.log('server is running on port: 9999');
})