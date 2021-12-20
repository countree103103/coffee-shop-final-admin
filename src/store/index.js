import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      msg: "",
    },
    user: null,
  },
  mutations: {},
  actions: {},
  modules: {},
});
