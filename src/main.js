import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "tailwindcss/tailwind.css";
import "./plugins/axios";
import { checkIfLogin_mixin } from "./util";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  mixins: [checkIfLogin_mixin],
}).$mount("#app");
