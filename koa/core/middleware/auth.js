//权限认证中间件
const jwt = require('jsonwebtoken')
const {key} = require("../../config/config").jsonwebtoken
class Auth {
    constructor() {
    }
    //开放接口，不验证任何token
    get noToken() {
    }
     //封闭接口，必须验证token权限为 “admin”
    get authToken() {
        return async (ctx, next) => {
            const header = ctx.request.header;
            const token = header.token
            try {
                //解密token
                const dcode = jwt.verify(token,key)
                //ctx挂载相关参数
                ctx.auth = {
                    userId: dcode.sign.userId,
                    userName: dcode.sign.userName,
                    hashPassword: dcode.sign.hashPassword
                }
            }
            catch (err) {
                if (err.name = "TokenExpiredError") {
                    throw new Error("TokenError")
                }
                throw new Error("TokenError")
            }
            await next()
        }
    }
}
module.exports = Auth