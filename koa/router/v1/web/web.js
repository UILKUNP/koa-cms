const Router = require("koa-router")
const svgCaptcha = require("svg-captcha")
const User = require("../../../models/user")
const newToken = require("../../../core/newToken")
const bcrypt = require("bcryptjs")
const Auth = require("../../../core/middleware/auth")
const router = new Router({
    prefix: '/api'
})
//获取验证码
router.get("/getCode", async ctx => {
    const captcha = svgCaptcha.create({    //这种生成的是随机数验证码
        size: 4,    //验证码长度1、
        fontSize: 50,   //字体大小
        width: 100,
        noise: 2,
        color: false,
        height: 40,
        background: '#ffffff'
    });
    ctx.response.type = 'image/svg+xml';
    ctx.session.text = captcha.text
    ctx.body = captcha.data;
})
//登陆
router.post("/login", async ctx => {
    // rule type must be one of number, int, integer, string, id, date, dateTime, datetime, boolean, bool, array, object, enum, email, password, url
    ctx.verifyParams({
        yzm: 'string',
        userName: 'string',
        password: 'password'
    });
    const yzm = ctx.request.body.yzm.toUpperCase()
    const userName = ctx.request.body.userName
    const password = ctx.request.body.password
    const code = ctx.session.text.toUpperCase()
    //判断验证码
    if (yzm === code) {
        //判断用户名
        const user = await User.findOne({
            where: {
                userName
            }
        })
        if (user) {
            //判断密码
            const hash = bcrypt.compareSync(password, user.password)
            //验证通过，生成token
            if (hash) {
                const userId = user.id;
                const userName = user.userName;
                const hashPassword = user.password;
                const sign = { userId, userName, hashPassword }
                const token = await newToken(sign, 'admin')
                ctx.body = {
                    token
                }
            } else {
                throw new Error("密码错误")
            }

        } else {
            throw new Error("用户名错误")
        }

    } else {
        throw new Error("验证码错误")
    }

})
module.exports = router