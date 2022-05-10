<template>
  <div>
    <v-btn plain class="mt-2 ml-2" @click="$router.push('/product')"
      ><v-icon>mdi-arrow-left</v-icon>返回</v-btn
    >
    <v-form class="m-8" ref="productForm">
      <!-- <div class="flex flex-row justify-center items-center flex-wrap"> -->
      <div class="mb-4">
        <v-img :src="product.product_img" height="200" contain></v-img>
        <v-file-input label="修改图片" dense v-model="fileInput"></v-file-input>
      </div>
      <input name="_id" :value="product.id" style="display: none" />
      <v-text-field
        label="名字"
        :value="product.product_name"
        name="product_name"
      ></v-text-field>
      <v-textarea
        name="product_des"
        :value="product.product_des"
        label="产品描述"
        outlined
      ></v-textarea>
      <v-select
        :items="['在架', '下架']"
        :value="product.product_status"
        name="product_status"
      ></v-select>
      <v-text-field
        label="现价格"
        :value="product.product_price_now"
        name="product_price_now"
      ></v-text-field>
      <v-text-field
        label="前价格"
        :value="product.product_price_before"
        name="product_price_before"
      ></v-text-field>
      <div class="product-opt">
        <h1 class="mb-4">
          产品选项
          <v-btn color="" text small tile @click="addOpt"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </h1>

        <v-divider></v-divider>

        <div
          class="product-opt-item"
          v-for="(opt, index) in product.product_opt"
          :key="index"
        >
          <h2 class="product-opt-item-title">
            {{ opt.title
            }}<v-btn icon x-small @click="delOpt(index)"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
          </h2>
          <div class="product-opt-item-list">
            <ol>
              <li v-for="(item, index2) in opt.attr" :key="index2">
                {{ item
                }}<v-btn icon x-small @click="delOptItem(opt, index2)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </li>
            </ol>
            <v-btn icon small @click="addOptItem(opt.attr)"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </div>
          <v-divider></v-divider>
        </div>
      </div>
      <v-btn color="success" class="m-4" @click="update">更新</v-btn>
      <!-- <v-btn color="error" class="m-4">删除</v-btn> -->
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { showMsg, reader } from "../util";

export default {
  name: "ProductDetail",
  data() {
    return {
      fileInput: null,
      product: null,
    };
  },
  watch: {
    async fileInput() {
      let r = await reader(this.fileInput);
      this.product.product_img = r.result;
    },
  },
  created() {
    // console.log(this.$route.params.product);
    this.product = this.$route.params.product;
    this.parseProductOpt(this.product.product_opt);
  },
  methods: {
    parseProductOpt(opt) {
      for (const i of opt) {
        i["attr"] = i.attr.split(",");
      }
    },
    addOpt() {
      let title = prompt("新增的属性是？");
      title
        ? this.product.product_opt.push({ title: title, attr: [] })
        : showMsg.call(this, "属性名不能为空！");
    },
    delOpt(index) {
      if (confirm("确认删除选项？")) this.product.product_opt.splice(index, 1);
    },
    addOptItem(attr) {
      let new_attr = prompt("新增的属性是？");
      new_attr ? attr.push(new_attr) : showMsg.call(this, "属性不能为空！");
    },
    delOptItem(opt, index) {
      if (confirm("确认删除属性？")) opt.attr.splice(index, 1);
    },
    async update() {
      let formData = new FormData(this.$refs.productForm.$el);
      formData.append("product_opt", JSON.stringify(this.product.product_opt));
      formData.append("product_img", this.product.product_img);
      console.log(formData.entries());
      try {
        let result = await axios.post("/coffee/admin/product/update", formData);
        if (result.data) {
          showMsg.call(this, "更新成功！");
          this.$router.push({ name: "Product" });
        } else {
          showMsg.call(this, "更新失败！");
        }
      } catch (error) {
        showMsg.call(this, "服务器错误！");
      }
    },
  },
};
</script>

<style lang="scss">
.product-opt {
  @apply w-full border border-gray-800 p-4 rounded-xl mt-4;
}
.product-opt-title {
}
.product-opt-item {
  @apply w-full my-3;
}
.product-opt-item-list {
  @apply flex flex-row justify-start items-center w-full;
  ol {
    @apply list-decimal flex flex-row w-auto flex-wrap;
    li {
      @apply m-4;
    }
  }
}
</style>
