// 导入axios
"vuex";
import axios from "axios";
//设置基地址
const request = axios.create({
  baseURL: "http://dev.copyscript.cn/api",
});
//暴露http
export default request;
