<template>
  <div>
    <div>
      <v-data-table
        :headers="table.headers"
        :items="table.items"
        :items-per-page="table.items_per_page"
      >
        <template v-slot:item.register_date="{ item }">
          {{ new Date(item.register_date).toLocaleString() }}
        </template>
        <template v-slot:item.last_login_date="{ item }">
          {{ new Date(item.last_login_date).toLocaleString() }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { showMsg } from "../util";

export default {
  name: "User",
  data() {
    return {
      userList: [],
      table: {
        headers: [
          { sortable: true, text: "ID", value: "id" },
          { sortable: true, text: "用户名", value: "user_name" },
          { sortable: true, text: "类型", value: "user_type" },
          { sortable: true, text: "性别", value: "user_gender" },
          { sortable: true, text: "注册时间", value: "register_date" },
          { sortable: false, text: "最后登录IP", value: "last_login_ip" },
          { sortable: true, text: "最后登录时间", value: "last_login_date" },
          // { text: "", value: "" },
          // { text: "", value: "" },
        ],
        items: [],
        items_per_page: 5,
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      try {
        let result = await axios.get("/coffee/admin/user");
        if (result.data) {
          this.userList = result.data;
          this.table.items = this.userList;
        } else {
          showMsg.call(this, "获取用户列表失败!");
        }
      } catch (error) {
        console.log(error);
        showMsg.call(this, "服务器错误!");
      }
    },
  },
};
</script>

<style></style>
