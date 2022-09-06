import devMiddleware, { Options } from 'webpack-dev-middleware'
import hotMiddleware, { MiddlewareOptions } from 'webpack-hot-middleware'
import { Compiler } from 'webpack'
import { Context } from 'koa'

export const koaDevMiddleware = (compiler: Compiler, opts?: Options<any, any>) => {
    const middleware = devMiddleware(compiler, opts)

    async function webpackDevMiddleware(ctx: Context | any, next: () => Promise<any>) {
        ctx.res['send'] = (content: any) => {
            ctx.body = content
        },
            await middleware(ctx.req, ctx.res, next)
    }

    return webpackDevMiddleware
}

export const koaHotMiddleware = (compiler: Compiler, opts?: MiddlewareOptions) => {
    const middleware = hotMiddleware(compiler, opts)
    return async (ctx: Context, next: () => Promise<any>) => {
        await middleware(ctx.req, ctx.res, next)
    }
}
