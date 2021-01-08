import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import config from "./config";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer(val) {
        return {
          user: val.user,
        };
      },
    }),
  ],
  modules: {
    user,
    config,
  },
});
export default store;
