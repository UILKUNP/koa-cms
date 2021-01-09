const Router = require("koa-router");
const newToken = require("../../../core/newToken");
const bcrypt = require("bcryptjs");
const Auth = require("../../../core/middleware/auth");
const Users = require("../../../models/users");
const code2openid = require("./lib/code2openid");
const router = new Router({
  prefix: "/v1/api",
});
//获取jssdk相关参数
router.get("/jssdkConfig", async (ctx) => {
  ctx.body = {
    code: "成功",
  };
});
//获取设置参数
router.get("/config", async (ctx) => {
  ctx.body = {
    clear: false,
    clearMoment: 1000, //清理后，多久之内不再重复清理 毫秒
    serveTime: Number(new Date()),
    reload: true,
  };
});
//获取jssdk相关参数
router.get("/tokenAuth", async (ctx) => {
  ctx.body = ctx.request.query.echostr;
});
//登陆
router.post("/loginByCode", async (ctx) => {
  // rule type must be one of number, int, integer, string, id, date, dateTime, datetime, boolean, bool, array, object, enum, email, password, url
  ctx.verifyParams({
    code: "string",
  });
  const code = ctx.request.body.code;
  const openid = await code2openid(code);
  if (openid.openid) {
    const user = await Users.findOne({
      where: {
        openId: openid.openid,
      },
    });
    if (!user) {
      await Users.create({
        openId: openid.openid,
      });
    }
    ctx.body = {
      openid,
    };
    return;
  }
  ctx.body = {
    openid: {},
  };

  return;
});

module.exports = router;
