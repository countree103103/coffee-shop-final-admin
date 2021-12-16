<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab key="product">
        <v-icon left> mdi-account </v-icon>
        产品列表
      </v-tab>
      <v-tab key="addProduct">
        <v-icon left> mdi-plus </v-icon>
        添加产品
      </v-tab>
      <v-tab>
        <v-icon left> mdi-access-point </v-icon>
        分类管理
      </v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="tab">
      <v-tab-item key="product"> <ListProduct></ListProduct> </v-tab-item>
      <v-tab-item key="addProduct"><AddProduct></AddProduct></v-tab-item>
      <v-tab-item> </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import AddProduct from "./AddProduct.vue";
import ListProduct from "./ListProduct.vue";

export default {
  name: "Product",
  data() {
    return {
      tab: null,
    };
  },
  async created() {},
  methods: {},
  components: { AddProduct, ListProduct },
};
</script>

<style lang="scss"></style>
