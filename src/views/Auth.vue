<template>
  <div
    class="flex justify-center items-center h-full w-full"
    style="background-color: rgba(81, 44, 29, 0.3)"
  >
    <v-card width="50%" class="p-8" color="">
      <v-card-title>请登陆</v-card-title>
      <v-card-text>
        <v-form ref="loginForm">
          <v-text-field label="用户名" name="user_name"></v-text-field>
          <v-text-field
            label="密码"
            type="password"
            name="user_password"
            @keydown.enter="login"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="" @click="login" :loading="form.login.loading"
          >登入</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { showMsg } from "../util";

export default {
  name: "Auth",
  data() {
    return {
      form: {
        login: {
          loading: false,
        },
      },
    };
  },
  created() {},
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        let loginForm = new FormData(this.$refs.loginForm.$el);
        try {
          this.form.login.loading = true;
          let res = await axios.post(`/coffee/admin/user/login`, loginForm);
          console.log(res.data);
          if (res.data) {
            let result = await axios.get(`/coffee/user/getUserInfo`, {
              withCredentials: true,
            });
            console.log(result);
            if (result.data) {
              let userInfo = result.data;
              this.$store.state.user = userInfo;
              this.$router.push("/product");
            } else {
              showMsg.call(this, "获取用户信息失败！请稍后再试");
            }
          } else {
            showMsg.call(this, "登陆失败!请检查用户名或密码");
          }
        } catch (error) {
          this.form.login.loading = false;
          showMsg.call(this, "登录失败！请稍后再试");
        }
        this.form.login.loading = false;
      }
    },
  },
};
</script>

<style></style>
