import urlTool from "@lib/url";
export default {
  namespaced: true,
  state: {
    appId: "wxb8acf6791f94f19a",
    baseUrl: "http://dev.copyscript.cn",
  },
  getter: {},
  mutations: {
    getUserCodeThenBack(store) {
      // return;
      let appid = store.appId;
      const urlJSON = urlTool.parseURL(window.location.href);
      console.log(urlJSON);
      let redirectURL = `${urlJSON["originPath"]}`;
      console.log(redirectURL);
      const base = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=";
      let scope = "snsapi_base";
      let url = `${base}${appid}&redirect_uri=${redirectURL}&response_type=code&scope=${scope}#wechat_redirect`;
      window.location.href = url;
    },
  },
  actions: {},
};
