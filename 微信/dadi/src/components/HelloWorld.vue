<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>{{ appId }}</h3>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetter } from "vuex";
export default {
  name: "HelloWorld",
  computed: {
    ...mapState("config", ["appId"]),
  },
  props: {
    msg: String,
  },
  created() {
    this.getUserCode();
  },
  methods: {
    getUrlParam(name) {
      //name为要获取的参数名
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var rrr = decodeURIComponent(window.location.search);
      var r = rrr.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    getUserCode() {
      let baseurl = "http://188.188.1.4:8080";
      let redirectURL = encodeURI(
        (baseurl + window.location.pathname + window.location.search).split(
          "&code"
        )[0]
      ); //获取地址
      console.log(redirectURL);
      const base = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=";
      let state;
      let surl;
      let reserveUrl;
      let appid = this.appId;
      let scope = "snsapi_base";
      window.location.href =
        base +
        appid +
        "&redirect_uri=" +
        redirectURL +
        "&response_type=code&scope=" +
        scope +
        "#wechat_redirect";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
