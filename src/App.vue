<template>
    <div id="app">
      <router-view></router-view>
    </div>
  </template>
  
  <script>
export default {
  name: "app",
  data() {
    return {
      minHeight: ""
    };
  },
  mounted() {}
};
</script>
  
  <style>
@import "../static/css/common.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.crumb {
  height: 36px;
  line-height: 36px!important;
}
</style>
  