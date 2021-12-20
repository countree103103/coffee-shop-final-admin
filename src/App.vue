<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template> -->

      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>航海咖啡商城后台</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="logout"><v-icon>mdi-logout</v-icon></v-btn>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->

      <!-- <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="yellow" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->

      <template v-slot:extension>
        <v-tabs align-with-title v-if="$store.state.user">
          <v-tab @click="$router.push('/product')">产品管理</v-tab>
          <v-tab @click="$router.push('/user')">用户管理</v-tab>
          <v-tab @click="$router.push('/order')">订单管理</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-snackbar
      v-model="$store.state.snackbar.show"
      timeout="2000"
      color="#512c1d"
    >
      {{ $store.state.snackbar.msg }}
      <template v-slot:action="{}">
        <v-btn @click.native="$store.state.snackbar.show = false" text
          >关闭</v-btn
        >
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";
import { showMsg } from "./util";

export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {},
  methods: {
    async logout() {
      let result = await axios.post("/coffee/user/logout");
      if (result.data) {
        this.$store.state.user = null;
        this.$router.push("/auth");
      } else {
        showMsg(this, "登出失败!");
      }
    },
  },
};
</script>
<style lang="scss">
:root {
  --text-primary: #512c1d;
}
</style>
