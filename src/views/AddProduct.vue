<template>
  <div class="product-add p-4">
    <v-form ref="addProductForm">
      <div>
        <v-img :src="product.product_img" height="200" contain>
          <template v-slot:placeholder>
            <div
              class="flex justify-center items-center h-full border border-gray-800 rounded-lg border-dashed"
            >
              <p>请选择正确照片</p>
            </div>
          </template>
        </v-img>
        <v-file-input
          class="mt-8"
          label="选择产品图片"
          dense
          v-model="fileInput"
        ></v-file-input>
      </div>
      <v-text-field
        name="product_name"
        label="产品名"
        :rules="[(val) => (val && val.length > 0) || '不能为空']"
      ></v-text-field>
      <v-textarea name="product_des" label="产品描述" outlined></v-textarea>
      <v-text-field
        name="product_price_now"
        label="价格"
        hint="单位 元￥"
        :rules="[(val) => (val && val.length > 0) || '不能为空']"
      ></v-text-field>
      <div class="product-opt">
        <h1 class="mb-4">
          产品选项
          <v-btn color="" text small tile @click="addOpt"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </h1>

        <v-divider></v-divider>

        <template v-if="product.product_opt && product.product_opt.length"
          ><div
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
            <v-divider></v-divider></div
        ></template>
        <template v-else
          ><p class="m-8 text-gray-500">
            单击<v-icon>mdi-plus</v-icon>添加选项!
          </p></template
        >
      </div>
      <v-btn color="success" @click="addProduct()" class="mt-4">添加</v-btn>
      <v-btn @click="resetForm" class="mt-4 ml-4">重置表单</v-btn>
    </v-form>
  </div>
</template>

<script>
import { reader, showMsg } from "../util";
import axios from "axios";

export default {
  name: "AddProduct",
  data() {
    return {
      fileInput: null,
      product: {
        product_img: "",
        product_opt: [],
      },
    };
  },
  computed: {},
  watch: {
    async fileInput() {
      let r = await reader(this.fileInput);
      this.product.product_img = r.result;
    },
  },
  methods: {
    addOpt() {
      let title = prompt("新增的选项是？");
      title
        ? this.product.product_opt.push({ title: title, attr: [] })
        : showMsg.call(this, "选项名不能为空！");
    },
    delOpt(index) {
      if (confirm("确认删除选项？")) this.product.product_opt.splice(index, 1);
    },
    addOptItem(attr) {
      let new_attr = prompt("选项新增的属性是？");
      new_attr ? attr.push(new_attr) : showMsg.call(this, "属性不能为空！");
    },
    delOptItem(opt, index) {
      if (confirm("确认删除属性？")) opt.attr.splice(index, 1);
    },
    async addProduct() {
      if (this.$refs.addProductForm.validate()) {
        let formData = new FormData(this.$refs.addProductForm.$el);
        formData.append(
          "product_opt",
          JSON.stringify(this.product.product_opt)
        );
        formData.append("product_img", this.product.product_img);
        try {
          let result = await axios.post("/coffee/admin/product/add", formData);
          if (result.data) {
            showMsg.call(this, "添加商品成功!");
          } else {
            showMsg.call(this, "添加商品失败!");
          }
        } catch (error) {
          console.log(error);
          showMsg.call(this, "服务器错误!");
        }
      } else {
        null;
      }
    },
    resetForm() {
      this.$refs.addProductForm.reset();
      this.product.product_opt = [];
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
