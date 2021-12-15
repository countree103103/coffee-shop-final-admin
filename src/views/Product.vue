<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab key="product">
        <v-icon left> mdi-account </v-icon>
        产品列表
      </v-tab>
      <v-tab>
        <v-icon left> mdi-plus </v-icon>
        添加产品
      </v-tab>
      <v-tab>
        <v-icon left> mdi-access-point </v-icon>
        分类管理
      </v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="tab">
      <v-tab-item key="product">
        <div class="product-list">
          <v-simple-table>
            <thead>
              <tr>
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
              <tr v-for="i in 5" :key="i">
                <td>拿铁</td>
                <td>精品咖啡</td>
                <td>666￥</td>
                <td>999￥</td>
                <td>时间</td>
                <td>上架</td>
                <td>
                  <v-btn
                    color="success"
                    class="mr-4"
                    small
                    @click="$router.push('/productDetail')"
                    >编辑</v-btn
                  >
                  <v-btn color="error" small>删除</v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-tab-item>
      <v-tab-item> </v-tab-item>
      <v-tab-item> </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "Product",
  data() {
    return { tab: null };
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
