const Router = require("koa-router")
const svgCaptcha = require("svg-captcha")

const User = require("../../../models/user")
const Sort = require("../../../models/sort")
const Archive = require("../../../models/archive")
const Article = require("../../../models/article")//文章表
const ArticleSort = require("../../../models/articleSort")//文章分类中间表
const newToken = require("../../../core/newToken")
const bcrypt = require("bcryptjs")
const Auth = require("../../../core/middleware/auth")
const router = new Router({
    prefix: '/v1'
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
    console.log(ctx.session)
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
//获取个人资料
router.get("/getMe", new Auth().authToken, async ctx => {
    const userId = ctx.auth.userId
    const me = await User.findOne({
        where: {
            id: userId
        },
        attributes: ['userName', 'headImg', 'signature', 'nickName', 'email', 'email2']
    })
    ctx.body = {
        me
    }
})
//修改个人资料
router.post("/updateMe", new Auth().authToken, async ctx => {
    const  nickName=ctx.request.body.nickName
    const  headImg=ctx.request.body.headImg
    const  signature=ctx.request.body.signature
    const  email=ctx.request.body.email
    const  email2=ctx.request.body.email2
    const userId = ctx.auth.userId
    ctx.verifyParams({
        nickName: 'string',
        headImg: 'string',
        signature: 'string',
        email: 'email',
        email2: 'email'
    });
    //验证通过
    const me = await User.update({
        nickName,
        headImg,
        signature,
        email,
        email2
    },{
        where: {
            id: userId
        }
    })
    ctx.body = {
        me
    }
})
//新建分类
router.post("/newSort", new Auth().authToken, async ctx => {
    const sortName = ctx.request.body.sortName
    const sortImg = ctx.request.body.sortImg
    const userId = ctx.auth.userId
    ctx.verifyParams({
        sortName: 'string',
        sortImg: 'string'
    });
    //查询是否有同名分类
    const sortFind=await Sort.findOne({
        where: {
            sortName,
            userId
        }
    })
    if (sortFind){
        //如果已经有了这个分类 修改
        const sortUpdate = await Sort.update({ sortImg, sortName}, { where: { userId, sortName} })
        ctx.body={
            sortUpdate
        }
    } 
    else{
        //没如果没有这个分类  新增
        const sortNew=await Sort.create({
            sortName, sortImg, userId
        })
        ctx.body = {
            sortNew: sortNew.id
        }
    }
    
})
//编辑分类
router.post("/editSort", new Auth().authToken, async ctx => {
    const sortName = ctx.request.body.sortName
    const sortImg = ctx.request.body.sortImg
    const id = ctx.request.body.id
    const userId = ctx.auth.userId
    ctx.verifyParams({
        sortName: 'string',
        sortImg: 'string'
    });
    const sortUpdate = await Sort.update({ sortImg, sortName}, { where: { userId, id} })
    ctx.body={
            sortUpdate
    }
})
//获取分类
router.get("/getSort", new Auth().authToken, async ctx => {
    const userId = ctx.auth.userId;
    const getSort=await Sort.findAll({
        where: {
            userId
        },
        attributes: ['id', 'sortImg', 'sortName']
    })
    ctx.body={
        getSort
    }
})
//删除分类
router.post("/delSort", new Auth().authToken, async ctx => {
    const userId = ctx.auth.userId;
    const id = ctx.request.body.id;
    const delSort=await Sort.destroy({
        where: {
            id,
            userId
        }
    });
    ctx.body={
        delSort
    }
    
})
///////归档管理
//新建归档
router.post("/newArchive", new Auth().authToken, async ctx => {
    const archiveName = ctx.request.body.archiveName
    const archiveImg = ctx.request.body.archiveImg
    const userId = ctx.auth.userId
    ctx.verifyParams({
        archiveName: 'string',
        archiveImg: 'string'
    });
    //查询是否有同名分类
    const archiveFind=await Archive.findOne({
        where: {
            archiveName,
            userId
        }
    })
    if (archiveFind){
        //如果已经有了这个分类 修改
        const archiveUpdate = await Archive.update({ archiveName, archiveImg }, { where: { userId, archiveName} })
        ctx.body={
            archiveUpdate
        }
    } 
    else{
        //没如果没有这个分类  新增
        const archiveNew=await Archive.create({
            archiveName, archiveImg, userId
        })
        ctx.body = {
            archiveNew: archiveNew.id
        }
    }
    
})
//编辑归档
router.post("/editArchive", new Auth().authToken, async ctx => {
    const archiveName = ctx.request.body.archiveName
    const archiveImg = ctx.request.body.archiveImg
    const id = ctx.request.body.id
    const userId = ctx.auth.userId
    ctx.verifyParams({
        archiveName: 'string',
        archiveImg: 'string'
    });
    const archiveUpdate = await Archive.update({ archiveImg, archiveName}, { where: { userId, id} })
    ctx.body={
            archiveUpdate
    }
})
//获取归档
router.get("/getArchive", new Auth().authToken, async ctx => {
    const userId = ctx.auth.userId;
    const getarchive=await Archive.findAll({
        where: {
            userId
        },
        attributes: ['id', 'archiveImg', 'archiveName']
    })
    ctx.body={
        getarchive
    }
})
//删除归档
router.post("/delArchive", new Auth().authToken, async ctx => {
    const userId = ctx.auth.userId;
    const id = ctx.request.body.id;
    const delArchive=await Archive.destroy({
        where: {
            id,
            userId
        }
    });
    ctx.body={
        delArchive
    }
    
})
//新建文章
router.post("/newBlog", new Auth().authToken, async ctx => {
    const userId = ctx.auth.userId;
    const contant = ctx.request.body.contant;//内容
    const title = contant.content[0].content[0].text;//标题
    const mainImg = ctx.request.body.mainImg;//主图
    const sorts = ctx.request.body.sorts;//分类 Array
    const archiveId = ctx.request.body.archiveId;//归档id
    //创建文章
    const art=await Article.create({
        userId, contant, title,mainImg, archiveId
    })
    //创建分类映射
    for (let i in sorts){
        await ArticleSort.create({
            sortId: sorts[i].id,
            articleId: art.id
        })
    }
    ctx.body={
        Id: art.id
    }

})



module.exports = router