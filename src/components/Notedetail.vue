<template>
  <div class="note-detail">
    <h1>{{ msg }} : {{ $router.params.noteId }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "笔记详情页",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
