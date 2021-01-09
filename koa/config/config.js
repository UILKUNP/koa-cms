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
    appid: "wxb8acf6791f94f19a",
    secret: "0317671fa9dd907831646e25e6505b4c",
  },
  jsonwebtoken: {
    key: "3MjU0LCJleHAiOj", //密码  ！！！重要，不可泄漏
    expiresIn: 60 * 10 * 10, // token过期时间，单位秒
  },
};
