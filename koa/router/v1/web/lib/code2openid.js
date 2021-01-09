const { wx } = require("../../../../config/config");
const request = require("request");
function promiseReq(opts = {}) {
  return new Promise((resolve, reject) => {
    request(opts, (e, r, d) => {
      if (e) {
        return reject(e);
      }
      if (r.statusCode != 200) {
        return reject(`back statusCode：${r.statusCode}`);
      }
      return resolve(d);
    });
  });
}
module.exports = async function (code) {
  let grant_type = "authorization_code";
  let appid = wx.appid;
  let secret = wx.secret;
  console.log("req code: ", code);
  let opts = {
    url:
      "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" +
      appid +
      "&secret=" +
      secret +
      "&code=" +
      code +
      "&grant_type=" +
      grant_type,
  };
  let res = await promiseReq(opts);
  res = JSON.parse(res);
  return res;
};
