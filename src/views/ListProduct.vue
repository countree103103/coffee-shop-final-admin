<template>
  <div class="product-list">
    <v-simple-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名字</th>
          <th>分类</th>
          <th>现价格</th>
          <th>原价格</th>
          <th>创建时间</th>
          <th>状态</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in productList" :key="index">
          <td>{{ product.id }}</td>
          <td>{{ product.product_name }}</td>
          <td>{{ product.product_type }}</td>
          <td>{{ product.product_price_now }}</td>
          <td>{{ product.product_price_before }}</td>
          <td>
            {{ new Date(product.product_create_time).toLocaleString() }}
          </td>
          <td>{{ product.product_status }}</td>
          <td>
            <v-btn
              color="success"
              class="mr-4"
              small
              @click="
                $router.push({
                  name: 'ProductDetail',
                  params: { product },
                })
              "
              >编辑</v-btn
            >
            <v-btn color="info" small @click="toggleProduct(product)"
              >切换状态</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";
import { showMsg } from "../util";

export default {
  name: "ListProduct",
  data() {
    return {
      productList: [],
    };
  },
  methods: {
    async getProductList() {
      try {
        let result = await axios.get("/coffee/admin/product");
        result.data
          ? (this.productList = result.data)
          : showMsg.call(this, "获取产品列表失败!");
      } catch (error) {
        showMsg.call(this, "服务器错误!");
      }
    },
    async toggleProduct(product) {
      if (confirm("确认切换该商品状态？(在架或下架)")) {
        try {
          console.log(product.id);
          let formData = new FormData();
          formData.append("id", product.id);
          formData.append("product_status", product.product_status);
          let result = await axios.post(
            "/coffee/admin/product/toggle",
            formData
          );
          if (result.data) {
            showMsg.call(this, "切换状态成功!");
            this.getProductList();
          } else {
            showMsg.call(this, "切换状态失败!");
          }
        } catch (error) {
          console.log(error);
          showMsg.call(this, "服务器错误!");
        }
      }
    },
  },
  async created() {
    this.getProductList();
    setInterval(this.getProductList, 1000 * 10);
  },
};
</script>

<style lang="scss">
.product-list {
  @apply mt-4;
  ul {
    @apply list-none;
  }
}
</style>
