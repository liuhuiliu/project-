<template>
  <div id="login">
    <div class="model-mask">
      <div class="model-wrapper">
        <div class="model-container">
          <div class="title">
            <h2>简易云笔记</h2>
          </div>
          <div class="form">
            <h3 @click="showRegister">注册账号</h3>
            <div v-show="isShowRegister" class="register">
              <input
                type="text"
                v-model="register.username"
                placeholder="username"
              />
              <input
                type="password"
                v-model="register.password"
                placeholder="password"
              />
              <p v-bind:class="{ error: register.isError }">
                {{ register.notice }}
              </p>
              <div class="button">创建</div>
            </div>
            <h3 @click="showLogin">登陆账号</h3>
            <div v-show="isShowLogin" class="login">
              <input
                type="text"
                v-model="login.username"
                placeholder="username"
              />
              <input
                type="password"
                v-model="login.password"
                placeholder="password"
              />
              <p v-bind:class="{ error: login.isError }">{{ login.notice }}</p>
              <div class="button">登陆</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: "hunger",
        password: "123456",
        notice: "请输入用户名与密码",
        isError: false,
      },
      register: {
        username: "xxx",
        password: "xxx",
        notice: "创建账号后请记住用户名与密码",
        isError: false,
      },
    };
  },
  methods: {
    showRegister() {
      this.isShowLogin = true;
      this.isShowRegister = false;
    },
    showLogin() {
      this.isShowLogin = false;
      this.isShowRegister = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.model-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity 0.3s ease;
}
.model-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.model-container {
  width: 270px;
  height: auto;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  // display: flex;
  .title {
    text-align: center;
    padding: 10px 10px;
  }
  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    h3 {
      padding: 10px 20px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }
    .button {
      background-color: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }
    .login,
    .register {
      padding: 10px 20px;
      border-top: 1px solid #eee;
      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;
      }
      input:focus {
        border: 3px solid #9dcaf8;
      }
      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }
      .error {
        color: red;
      }
    }
    .login {
      border-top: 0;
    }
  }
}
</style>
