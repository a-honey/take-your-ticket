<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  background-color: rgb(191, 0, 0);
  height: 10vh;
  display: flex;
  padding: 0 40px;
  font-size: 20px;
  align-content: center;
  color: white;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

form {
  display: flex;
}
</style>
