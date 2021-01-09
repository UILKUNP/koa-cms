//post方法
import request from "../request";
export const login = (code) => {
  return request.post("/v1/api/loginByCode", {
    code,
  });
};
export const config = () => {
  return request.get("/v1/api/config");
};
