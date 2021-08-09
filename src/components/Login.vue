<template>
  <div id="login">
    <div class="model-mask">
      <div class="model-wrapper">
        <div class="model-container">
          <div class="title">
            <h2>欢迎来到简易云笔记</h2>
          </div>
          <div class="form">
            <h3
              @click="showRegister"
              v-bind:class="{ onclick: isShowRegister }"
            >
              注册账号
            </h3>
            <!-- <transition name="slide"> -->
            <div
              v-show="isShowRegister"
              class="register"
              v-bind:class="{ show: isShowRegister }"
            >
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
              <div class="button" @click="onRegister">创建</div>
            </div>
            <!-- </transition> -->
            <h3 @click="showLogin" v-bind:class="{ onclick: isShowLogin }">
              登陆账号
            </h3>
            <!-- <transition name="slide"> -->
            <div
              v-show="isShowLogin"
              class="login clearfix"
              v-bind:class="{ show: isShowLogin }"
            >
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
              <p v-bind:class="{ error: login.isError }">
                {{ login.notice }}
              </p>
              <div class="button" @click="onLogin">登陆</div>
            </div>
            <!-- </transition> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../helpers/request";
import Auth from "../api/auth";

Auth.getInfo().then((res) => {
  console.log(res);
});
export default {
  name: "HelloWorld",
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: "",
        password: "",
        notice: "请输入用户名与密码",
        isError: false,
      },
      register: {
        username: "",
        password: "",
        notice: "创建账号后请记住用户名与密码",
        isError: false,
      },
    };
  },
  methods: {
    showRegister() {
      this.isShowLogin = false;
      this.isShowRegister = true;
    },
    showLogin() {
      this.isShowLogin = true;
      this.isShowRegister = false;
    },
    onRegister() {
      console.log("register");
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
        this.register.isError = true;
        this.register.notice = "用户名3~15个字符，仅限于字母数字下划线中文";
        return;
      }
      if (!/^.{6,16}$/.test(this.register.password)) {
        this.register.isError = true;
        this.register.notice = "密码长度为6~16个字符";
        return;
      }
      this.register.isError = false;
      this.register.notice = "";
      console.log(
        `start register..., username: ${this.register.username} , password: ${this.register.password}`
      );
      Auth.register({
        username: this.register.username,
        password: this.register.password,
      }).then((res) => {
        console.log(res);
      });
    },
    onLogin() {
      console.log("login");
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true;
        this.login.notice = "用户名3~15个字符，仅限于字母数字下划线中文";
        return;
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true;
        this.login.notice = "密码长度为6~16个字符";
        return;
      }
      // this.login.isError = false;
      // this.login.notice = "";
      console.log(
        `start login..., username: ${this.login.username} , password: ${this.login.password}`
      );
      request("/auth/login", "POST", {
        username: this.login.username,
        password: this.login.password,
      }).then((res) => {
        console.log(res);
      });
    },
    checkUsername(username) {},
    checkPassword(password) {},
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
  border-radius: 10px;
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
    // border-left: 1px solid #ccc;
    overflow: hidden;

    h3 {
      text-align: center;
      padding: 10px 20px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.5);
      // margin-top: -1px;
      // &:nth-of-type(2) {
      //   // border-bottom: 1px solid #eee;
      // }
      padding: 10px 20px 10px 20px;
    }
    .onclick {
      background-color: rgba(65, 140, 225, 0.205);
      color: rgb(65, 140, 225);
      // border-bottom: none;
      // padding: 10px 20px 0px 20px;
    }
    .button {
      background-color: #fff;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: rgb(65, 140, 225, 0.7);
      border-radius: 4px;
      margin-top: 15px;
      cursor: pointer;
      border: 1px solid;
      border-color: rgb(65, 140, 225, 0.7);
      margin-bottom: 10px;
    }
    .button:hover {
      background-color: rgb(65, 140, 225, 0.7);
      color: #fff;
      border: 1px solid rgba(65, 140, 225, 0.5);
    }
    .login,
    .register {
      padding: 0px 20px 10px 20px;
      // border-top: 1px solid rgba(65, 140, 225, 0.205);
      background-color: rgba(65, 140, 225, 0.205);
      height: auto;
      overflow: hidden;
      // transition: height 2s;
      // display: none;
      // &.show {

      //   height: 188px;
      // }
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
.clearfix:after {
  content: " ";

  display: block;

  clear: both;

  height: 0;
}
</style>
