function goTo(url) {
  this.$router.push(url);
}

function showMsg(msg) {
  this.$store.state.snackbar.show = true;
  this.$store.state.snackbar.msg = msg;
}

function reader(file, options) {
  options = options || {};
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();

    reader.onload = function () {
      resolve(reader);
    };
    reader.onerror = reject;

    if (options.accept && !new RegExp(options.accept).test(file.type)) {
      reject({
        code: 1,
        msg: "wrong file type",
      });
    }

    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  });
}

const checkIfLogin_mixin = {
  created() {
    if (!this.$store.state.user) {
      showMsg.call(this, "未登录!");
      this.$router.push({ path: "/auth" });
    }
  },
};

export { goTo, showMsg, reader, checkIfLogin_mixin };
