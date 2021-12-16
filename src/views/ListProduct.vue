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
          <td>{{ product.product_create_time }}</td>
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
            <v-btn color="error" small>删除</v-btn>
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
  methods: {},
  async created() {
    try {
      let result = await axios.get("/coffee/product");
      result.data
        ? (this.productList = result.data)
        : showMsg.call(this, "获取产品列表失败!");
    } catch (error) {
      showMsg.call(this, "服务器错误!");
    }
  },
};
</script>

<style lang="scss">
.product-list {
  @apply mt-4;
  ul {
    @apply list-none;
    header {
      @apply text-lg;
      color: var(--text-primary);
    }
  }
}
</style>
