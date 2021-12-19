<template>
  <div>
    <div>
      <v-simple-table class="whitespace-nowrap">
        <thead>
          <tr>
            <th>订单ID</th>
            <th>创建时间</th>
            <th>产品列表(产品名/数量/选项)</th>
            <th>地址(姓名/地址/电话)</th>
            <th>支付方式</th>
            <th>总额(元)</th>
            <th>订单状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderList" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ new Date(order.order_create_time).toLocaleString() }}</td>
            <td class="bg-green-100 font-bold">
              <tr
                v-for="(product, index) in parseProductList(
                  JSON.parse(order.product_list)
                )"
                :key="index"
              >
                <td>{{ product }}</td>
              </tr>
            </td>
            <td class="bg-green-100 font-bold">{{ order.address }}</td>
            <td>{{ order.payment_type }}</td>
            <td>{{ order.order_sum }}</td>
            <td class="w-40">
              <v-select
                :items="['待确认', '准备中', '配送中', '订单完成', '订单取消']"
                v-model="order.order_status"
                label=""
                dense
              ></v-select>
            </td>
            <td>
              <div>
                <v-btn color="success" small>更新</v-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { showMsg } from "../util";

export default {
  name: "Order",
  data() {
    return {
      orderList: [],
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      try {
        let result = await axios.get("/coffee/order");
        if (result.data) {
          this.orderList = result.data;
        } else {
          showMsg.call(this, "获取订单列表失败!");
        }
      } catch (error) {
        console.log(error);
        showMsg.call(this, "服务器错误!");
      }
    },
    parseProductList(product_list) {
      let arr = [];
      for (const product of product_list) {
        let tmp = [];
        let tmp2 = [];
        tmp.push(product.product_name);
        tmp.push(product.product_num);
        for (const opt of product.product_opt) {
          tmp2.push(opt.value);
        }
        tmp.push(tmp2.join(","));
        arr.push(tmp.join("/"));
      }
      return arr;
    },
  },
};
</script>

<style lang="scss"></style>
