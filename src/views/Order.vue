<template>
  <div>
    <div>
      <!-- <v-simple-table>
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
            <td class="bg-green-50 font-bold whitespace-nowrap">
              <tr
                v-for="(product, index) in parseProductList(
                  JSON.parse(order.product_list)
                )"
                :key="index"
              >
                <td>{{ product }}</td>
              </tr>
            </td>
            <td class="bg-green-50 font-bold">{{ order.address }}</td>
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
                <v-btn color="success" small @click="updateOrder(order)"
                  >更新</v-btn
                >
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table> -->
      <div class="flex flex-row justify-center align-middle mt-2 mb-2">
        <v-btn-toggle v-model="selectedOrder">
          <v-btn small>待确认</v-btn>
          <v-btn small>准备中</v-btn>
          <v-btn small>配送中</v-btn>
          <v-btn small>订单完成</v-btn>
          <v-btn small>订单取消</v-btn>
        </v-btn-toggle>
      </div>
      <v-data-table
        :items-per-page="table.items_per_page"
        :headers="table.headers"
        :items="cOrderList"
        sort-by="order_create_time"
        :sort-desc="true"
        :search="search"
      >
        <template v-slot:no-data>
          <h1>暂无订单</h1>
        </template>
        <template v-slot:item.data-table-select></template>
        <template v-slot:foot>
          <v-text-field
            v-model="search"
            label="搜索及过滤"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.order_status="{ item }">
          <v-select
            class="w-28"
            :items="['待确认', '准备中', '配送中', '订单完成', '订单取消']"
            v-model="item.order_status"
            label=""
            dense
            @change="onSelectChange(item)"
          ></v-select>
        </template>
        <template v-slot:item.update="{ item }">
          <div>
            <v-btn color="success" small @click="updateOrder(item)">更新</v-btn>
          </div>
        </template>
        <template v-slot:item.order_create_time="{ item }">
          {{ new Date(item.order_create_time).toLocaleString() }}
        </template>
        <template v-slot:item.product_list="{ item }">
          <tr
            v-for="(product, index) in parseProductList(
              JSON.parse(item.product_list)
            )"
            :key="index"
          >
            <td>{{ product }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { showMsg } from "../util";

const enumOrderStatus = {
  0: "待确认",
  1: "准备中",
  2: "配送中",
  3: "订单完成",
  4: "订单取消",
};

export default {
  name: "Order",
  data() {
    return {
      orderList: [],
      search: "",
      table: {
        headers: [
          { sortable: true, text: "订单ID", value: "id" },
          { sortable: true, text: "创建时间", value: "order_create_time" },
          {
            sortable: false,
            text: "产品列表(产品名/数量/选项)",
            value: "product_list",
          },
          { sortable: false, text: "地址(姓名/地址/电话)", value: "address" },
          { sortable: false, text: "支付方式", value: "payment_type" },
          { sortable: true, text: "总额(元)", value: "order_sum" },
          { sortable: true, text: "订单状态", value: "order_status" },
          { sortable: false, text: "操作", value: "update" },
        ],
        items: [],
        items_per_page: 5,
      },
      selectedOrder: 0,
    };
  },
  computed: {
    cOrderList() {
      return this.orderList.filter((order) => {
        return order.order_status == enumOrderStatus[this.selectedOrder];
      });
    },
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      try {
        let result = await axios.get("/coffee/admin/order");
        if (result.data) {
          this.orderList = result.data;
          this.table.items = this.orderList;
        } else {
          showMsg.call(this, "获取订单列表失败!");
        }
      } catch (error) {
        console.log(error);
        showMsg.call(this, "服务器错误!");
      }
    },
    //目前仅允许更新订单状态
    async updateOrder(order) {
      let formData = new FormData();
      formData.append("_id", order.id);
      formData.append("order_status", order.order_status);

      try {
        let result = await axios.post("/coffee/admin/order/update", formData);
        if (result.data) {
          showMsg.call(this, "订单更新成功!");
        } else {
          showMsg.call(this, "订单更新失败!");
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
    onSelectChange(order) {
      console.log(order);
      this.updateOrder(order);
    },
  },
};
</script>

<style lang="scss"></style>
