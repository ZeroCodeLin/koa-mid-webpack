const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const { koaDevMiddleware, koaHotMiddleware } = require('../dist/index');
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

app.listen(9999, () => {
    console.log('server is running on port: 9999');
})