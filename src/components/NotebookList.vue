<template>
  <div id="notebook-list" class="detail">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"
        ><i class="iconfont icon-plus"> </i
      ></a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link
            v-for="(notebook, index) in notebooks"
            :key="index"
            to="/notebooks"
            class="notebook"
          >
            <div>
              <span class="iconfont icon-notebook"></span>
              {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              >
              <span class="action" @click.stop.prevent="onDelete(notebook)"
                >删除</span
              >
              <span class="date">{{notebook.createdDate}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "../api/auth";
import NoteList from "../api/notebooks";
import { friendlyDate } from '../helpers/util'

window.Notebooks = NoteList;
window.test = this.notebooks
export default {
  name: "HelloWorld",
  data() {
    return {
      notebooks: [],
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        window.alert("未登录，请登陆或注册后再操作");
        this.$router.push({ path: "/login" });
      }
    });
    NoteList.getAll().then((res) => {
      // console.log(res);
      this.notebooks = res.data;
      
      console.log(this.notebooks)
      // console.log(this.notebooks.sort((a, b) => b.id - a.id))

    });
  },
  methods: {
    onEdit(notebook) {
      console.log("edit");
      console.log(notebook.id);
      let title = window.prompt("请输入新标题", notebook.title);
      NoteList.updateNotebook(notebook.id, { title }).then((res) => {
        console.log(res);
        notebook.title=title
      });
    },
    onDelete(notebook) {
      console.log("delete");
      console.log(notebook.id);
      let isConfirm = window.confirm('是否确定删除?')
      if(isConfirm){
        NoteList.deleteNotebook(notebook.id).then(res=>{
          console.log(res)
          let deleteId = notebook.id
          this.notebooks = this.notebooks.filter(notebook =>notebook.id !=deleteId)
          // this.notebooks.splice(this.notebooks.indexOf(notebook),1)
        })
      }
    },
    onCreate() {
      // console.log("create");
      let title = window.prompt("创建新笔记本");
      console.log(title);
      if (title.trim() === "") {
        alert("不得为空");
        return;
      }
      NoteList.addNotebook({
        title,
      }).then((res) => {
        console.log(res);
        alert(res.msg);
        // NoteList.getAll().then((res) => {
        //   console.log(res);
        //   this.notebooks = res.data
        // });
        res.data.createdDate=friendlyDate(Date.now())
        this.notebooks.unshift(res.data)
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#notebook-list {
  flex: 1;
  height: 100%;
  overflow: scroll;
  .btn {
    font-size: 12px;
    color: #666;
    cursor: pointer;
    margin-left: 10px;
  }
  .btn .iconfont {
    font-size: 12px;
  }
  input {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 5px;
    outline: none;
  }
  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }
  main {
    padding: 30px 40px;
    // height: 100%;
    // overflow: scroll;
  }
  .layout {
    max-width: 966px;
    margin: 0 auto;
  }
  main h3 {
    font-size: 12px;
    color: #000;
  }
  main .book-list {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
  }
  main .book-list span {
    font-size: 12px;
    font-weight: bold;
    // color: #666869;
    // color: #b3c0c8;
    .icon-notebook{
      color:#1687ea;
    };
    
  }
  
  main .date,
  main .action {
    float: right;
    margin-left: 10px;
    color: #666869e5;
  }
  main .iconfont {
    color: #1687ea;
    margin-right: 4px;
  }
  main .notebook {
    display: block;
    cursor: pointer;
  }
  main a.notebook:hover {
    // background-color: #f7fafd;
    background-color: #1071df44;
  }
  main a.notebook div {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }
  main .error-msg {
    font-size: 12px;
    color: red;
  }
  
}
</style>
