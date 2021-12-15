function goTo(url) {
  this.$router.push(url);
}

function showMsg(msg) {
  this.$store.state.snackbar.show = true;
  this.$store.state.snackbar.msg = msg;
}

export { goTo, showMsg };
