<template>
  <div id="sidebar">
    <Avatar />
    <div class="icons">
      <router-link to="/note" tilte="笔记"
        ><i class="iconfont icon-note"></i
      ></router-link>
      <router-link to="/notebooks" tilte="笔记本"
        ><i class="iconfont icon-notebook"></i
      ></router-link>
      <router-link to="/trash" tilte="回收站"
        ><i class="iconfont icon-trash"></i
      ></router-link>
    </div>
    <div class="logout">
      <i class="iconfont icon-logout" @click="onLogout"></i>
    </div>
  </div>
</template>


<script>
import Avatar from "../components/Avatar.vue";
import request from "../helpers/request";
import Auth from "../api/auth";
import Bus from "../helpers/bus";
export default {
  components: { Avatar },
  // data: {},
  methods: {
    onLogout() {
      console.log("logout");
      Auth.logout().then((res) => {
        this.$router.push({path:'/login'})
        console.log(res);
        Bus.$emit('logout-userInfo',{username:'未知'})
      });
    },
  },
};
</script>


<style lang="less" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color:rgb(16, 113, 223);
  // background-color: #2c333c;
}
.icons {
  margin-top: 15px;
  a {
    padding: 6px 0;
    display: block;
  }
  .router-link-active {
    // background-color: #5e6266;
    background-color: rgba(212, 208, 208, 0.322);
  }
  .iconfont {
    color: #fff;
  }
}

.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;

  .iconfont {
    color: #fff;
  }
}
</style>