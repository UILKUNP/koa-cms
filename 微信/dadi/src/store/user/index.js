export default {
  namespaced: true,
  state: {
    openid: false,
  },
  getter: {},
  //修改state
  mutations: {
    setOpenid(state, openid) {
      state["openid"] = openid;
    },
  },
  actions: {},
};
