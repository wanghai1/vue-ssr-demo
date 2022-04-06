<template>
  <div class="App">
    <div class="mat_nav">
      <router-link to="/home">Goto home</router-link>
      <router-link to="/about">Goto Aboute</router-link>
    </div>
    <div class="mat_view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "APP",
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.App {
  display: fixed;
  width: 100%;
  height: 100%;
}
.mat_nav {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mat_view {
  height: calc(100% - 100px);
  width: 100%;
  background-color: aqua;
}
</style>
