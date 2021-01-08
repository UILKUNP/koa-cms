const Router = require("koa-router");
const newToken = require("../../../core/newToken");
const bcrypt = require("bcryptjs");
const Auth = require("../../../core/middleware/auth");
const Users = require("../../../models/users");
const router = new Router({
  prefix: "/v1/api",
});
//获取jssdk相关参数
router.get("/jssdkConfig", async (ctx) => {
  ctx.body = {
    code: "成功",
  };
});
//登陆
router.post("/loginByCode", async (ctx) => {
  // rule type must be one of number, int, integer, string, id, date, dateTime, datetime, boolean, bool, array, object, enum, email, password, url
  ctx.verifyParams({
    code: "string",
  });
  const code = ctx.request.body.code;
  ctx.body = {
    code,
  };
  return;
  const adminUser = await Users.findOne({
    where: {
      userName,
    },
    include: [
      {
        // include关键字表示关联查询
        model: Roles, // 指定关联的model
        as: "Roles", // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        // attributes: [['role_name', 'rN'], 'roleMark'], // 这里的attributes属性表示查询Roles表的roleName和roleMark字段，其中对roleName字段起了别名rN ,这里要转下划线写法
        attributes: ["roleName", "roleMark"], // 这里的attributes属性表示查询Roles表的roleName和roleMark字段，其中对roleName字段起了别名rN ,这里要转下划线写法
      },
    ],
  });
});

module.exports = router;
