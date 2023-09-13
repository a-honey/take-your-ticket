<template>
  <h1>Hello, Vue</h1>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
  mounted() {
    console.log("마운트됨");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
