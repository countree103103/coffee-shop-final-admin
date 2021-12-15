<template>
  <div>
    <v-btn plain class="mt-2 ml-2" @click="$router.push('/product')"
      ><v-icon>mdi-arrow-left</v-icon>返回</v-btn
    >
    <v-form class="m-8" ref="productForm">
      <!-- <div class="flex flex-row justify-center items-center flex-wrap"> -->
      <div class="mb-4">
        <v-img src="../assets/latte.jpeg" class="lg:h-40" contain></v-img>
        <v-file-input label="修改图片" dense></v-file-input>
      </div>
      <v-text-field label="名字" value="拿铁"></v-text-field>
      <v-select :items="['上架', '下架']" value="上架"></v-select>
      <v-text-field label="现价格" value="666"></v-text-field>
      <v-text-field label="前价格" value="999"></v-text-field>
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
          v-for="(opt, index) in optList"
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
              <li v-for="(item, index2) in opt.items" :key="index2">
                {{ item
                }}<v-btn icon x-small @click="delOptItem(opt, index2)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </li>
            </ol>
            <v-btn icon small @click="addOptItem(opt.items)"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </div>
          <v-divider></v-divider>
        </div>
      </div>
      <v-btn color="success" class="m-4">更新</v-btn>
      <!-- <v-btn color="error" class="m-4">删除</v-btn> -->
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { showMsg } from "../util";

export default {
  name: "ProductDetail",
  data() {
    return {
      optList: [
        { title: "温度", items: ["cold", "warm", "hot"] },
        { title: "温度", items: ["cold", "warm", "hot"] },
        { title: "温度", items: [] },
      ],
    };
  },
  methods: {
    addOpt() {
      let title = prompt("新增的属性是？");
      title
        ? this.optList.push({ title: title, items: [] })
        : showMsg.call(this, "属性名不能为空！");
    },
    delOpt(index) {
      if (confirm("确认删除选项？")) this.optList.splice(index, 1);
    },
    addOptItem(opt) {
      let attr = prompt("新增的属性是？");
      attr ? opt.push(attr) : showMsg.call(this, "属性不能为空！");
      opt.push();
    },
    delOptItem(opt, index) {
      if (confirm("确认删除属性？")) opt.items.splice(index, 1);
    },
    update() {
      let formData = new FormData(this.$refs.productForm.$el);
      formData.append("product_opt", this.optList);
      axios.post("/coffee/admin/product/update", formData);
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
