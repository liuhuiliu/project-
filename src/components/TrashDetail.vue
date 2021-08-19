<template>
  <div>
    <h1>hahah</h1>
  </div>
</template>

<script>
import Auth from "../api/auth";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        window.alert("未登录，请登陆或注册后再操作");
        this.$router.push({ path: "/login" });
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
