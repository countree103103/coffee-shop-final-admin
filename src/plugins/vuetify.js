import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import zhHans from "vuetify/lib/locale/zh-Hans";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: "zhHans",
  },

  theme: {
    themes: {
      light: {
        primary: "#512c1d",
        // secondary: '#b0bec5',
        // accent: '#8c9eff',
        // error: '#b71c1c',
      },
    },
  },
});
