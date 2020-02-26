const Router = require("koa-router")
const svgCaptcha = require("svg-captcha")
const newToken = require("../../../core/newToken")
const bcrypt = require("bcryptjs")
const Auth = require("../../../core/middleware/auth")
const AdminUsers = require("../../../models/adminUsers")

const Roles = require("../../../models/roles")
const Routes = require("../../../models/routes")

const router = new Router({
    prefix: '/api'
})
//获取验证码
router.get("/getCode", async ctx => {
    const captcha = svgCaptcha.create({    //这种生成的是随机数验证码
        size: 5,    //验证码长度1、
        fontSize: 55,   //字体大小
        width: 209,
        noise: 3,
        color: true,
        height: 55,
        // background: '#ffffff'
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
    const code = ctx.session.text.toUpperCase();
    const adminUser = await AdminUsers.findOne({
        where: {
            userName
        },
        include: [{ // include关键字表示关联查询
            model: Roles, // 指定关联的model
            as: 'Roles',  // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
            // attributes: [['role_name', 'rN'], 'roleMark'], // 这里的attributes属性表示查询Roles表的roleName和roleMark字段，其中对roleName字段起了别名rN ,这里要转下划线写法
            attributes: ['roleName', 'roleMark'], // 这里的attributes属性表示查询Roles表的roleName和roleMark字段，其中对roleName字段起了别名rN ,这里要转下划线写法
        }]
    });
    console.log(adminUser)
    //判断验证码
    if (yzm != code) {
        throw new Error('验证码错误')
    };
    if (!adminUser){
        throw new Error('用户名不存在')
    };
    let hash = bcrypt.compareSync(password,adminUser.password);//hash true 则密码正确
    if (!hash){
        throw new Error('密码错误')
    };
    const adminUserId = adminUser.id;        //用户id
    const adminUserName = adminUser.userName;//用户名
    const roleMark = adminUser.Roles.roleMark;//角色标示
    const hashPassword = adminUser.password; //hash密码
    const sign = { adminUserId, adminUserName, hashPassword, roleMark}
    const token = await newToken(sign,roleMark)
    ctx.body = {
        token
    }

})
//生成 hash密码 
router.post("/newPassword",new Auth().authToken,async ctx => {
    const password = ctx.request.body.password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt);
    ctx.body={
        hashPassword,
        auth:ctx.auth
    }
})

module.exports = router