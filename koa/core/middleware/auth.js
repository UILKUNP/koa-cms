//权限认证中间件
const jwt = require('jsonwebtoken')
const {key} = require("../../config/config").jsonwebtoken
class Auth {
    constructor() {
    }
    //开放接口，不验证任何token
    get noToken() {
    }
    get authToken() {
        return async (ctx, next) => {
            const header = ctx.request.header;
            const token = header.token
            try {
                //解密token
                const dcode = jwt.verify(token,key)
                //ctx挂载相关参数
                ctx.auth = {
                    adminUserId: dcode.sign.adminUserId,
                    adminUserName: dcode.sign.adminUserName,
                    hashPassword: dcode.sign.hashPassword,
                    scope: dcode.spoce
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