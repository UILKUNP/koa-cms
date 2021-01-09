<script>
import { mapState, mapMutations, mapActions, mapGetter } from "vuex";
import { login, config } from "@api/user";
import urlTool from "@lib/url";
export default {
  name: "mixins-test-main",
  computed: {
    ...mapState("config", ["appId"]),
    ...mapState("user", ["openid"]),
  },
  created() {
    const urlJSON = urlTool.parseURL(window.location.href);
    let code = urlJSON["params"].code;
    if (!this.openid) {
      if (!code) {
        //获取并且返回当前页面
        this.getUserCodeThenBack();
        return;
      }
      login(code).then((data) => {
        let OPENID = data.data.openid.openid;
        if (!OPENID) {
          this.getUserCodeThenBack();
          return;
        }
        this.setOpenid(OPENID);
      });
    }
  },
  beforeCreate() {
    let heart = setInterval(async () => {
      config().then((config) => {
        let data = config.data;
        const { serveTime, clearMoment, clear, reload } = data;
        //心跳函数 永不停止
        localStorage.setItem("serveTime", serveTime); //当前服务器时间
        localStorage.setItem("clearMoment", clearMoment); //清理保持时间
        let lastClearPast =
          parseInt(localStorage.getItem("serveTime")) -
          parseInt(localStorage.getItem("clearTime") || "0"); //距离上次清理过去的时间
        if (lastClearPast >= parseInt(clearMoment) && clear) {
          localStorage.clear();
          localStorage.setItem("clearTime", serveTime); //重置上次清理时间
          if (reload) {
            location.reload();
          }
        }
      });
    }, 3000);
  },
  methods: {
    ...mapMutations("config", ["getUrlParam", "getUserCodeThenBack"]),
    ...mapMutations("user", ["setOpenid"]),
  },
};
</script>
