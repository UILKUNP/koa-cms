/*
入口函数
*/
const requireDirectry = require("require-directory")
const Router = require("koa-router")
const config = require("../config/config")
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const cors = require('koa2-cors');
const session = require('koa-session');
const koaParameter = require("koa-parameter")
class InitMar {
    static initCore(app) {
        InitMar.app = app;
        InitMar.initKoaCor();
        InitMar.initKoaSession();
        InitMar.globalInt();
        InitMar.errCatch();
        InitMar.initKoaBody();
        InitMar.initKoaStatic();
        InitMar.initKoaParameter();
        InitMar.initLoadRouters();
    }
    //全局注册相关
    static globalInt() {
        //挂载参数到全局
        global.config = config;
        //挂载其他到全局
    }
    //全局异常捕获
    static errCatch() {
        InitMar.app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                // //发生已知错误
                ctx.status = 500
                ctx.body = {
                        message: err.message,
                        method: `${ctx.path} ${ctx.method}`
                };
                console.log('\x1B[36m%s\x1B[0m', err);
            }
        })
    }
    //初始化路由
    static initLoadRouters() {
        //获取api绝对路径
        const apiDirectory = `${process.cwd()}/router`
        requireDirectry(module, apiDirectory, {
            visit: module => {
                if (module instanceof Router) {
                    InitMar.app.use(module.routes())
                }
            }
        })
    }
    static initKoaBody() {
        InitMar.app.use(koaBody({
            multipart: true,
            formidable: {
                maxFileSize: 50000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
            }
        }));
    }
    //初始化koa-static 静态文件服务器
    static initKoaStatic() {
        InitMar.app.use(koaStatic(`${process.cwd()}/public/upload`));
    }
    //允许跨域请求
    static initKoaCor() {
        InitMar.app.use(cors({
            // origin: 'http://localhost:8080',
            credentials: true,
            maxAge: '1728000'
        }));
    }
    //使用koa-session
    static initKoaSession() {
        InitMar.app.keys = ['daoshu123'];//我理解为一个加密的密钥
        InitMar.app.use(session({
            key: 'koaCMS', /** cookie的名称，可以不管 */
            maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
            overwrite: true, /** (boolean) can overwrite or not (default true) */
            httpOnly: false, /** (boolean) httpOnly or not (default true) */
            signed: true, /** (boolean) signed or not (default true) */
        },InitMar.app));
    }
    //使用koaParameter参数校验
    static async initKoaParameter() {
        InitMar.app.use(koaParameter(InitMar.app))
    }

}
module.exports = InitMar