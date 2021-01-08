module.exports = {
  mysql: {
    host: "106.75.108.175",
    port: "3306",
    user: "emoji",
    password: "c8N8m62PK7cDrai6",
    database: "emoji",
    logging: false,
    connectionLimit: 20000,
  },
  upload: {
    //上传文件后，返回文件地址的前缀
    baseurl: "http://localhost:1135/",
  },
  admin: { password: "DQ3GD1DD" },
  wx: {
    appid: "wxe42f95780f60d4e3",
    secret: "cd2fb2ae9dbfdda6f49fddeace0076a8",
  },
  jsonwebtoken: {
    key: "3MjU0LCJleHAiOj", //密码  ！！！重要，不可泄漏
    expiresIn: 60 * 10 * 10, // token过期时间，单位秒
  },
};
