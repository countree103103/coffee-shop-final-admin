<template>
  <div class="flex justify-center items-center h-full w-full">
    <v-card width="50%" class="p-8">
      <v-card-title>请登陆</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="用户名"></v-text-field>
          <v-text-field label="密码" type="password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success">登入</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Auth",
};
</script>

<style></style>
