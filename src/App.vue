<template>
  <div id="app">
    <page-header></page-header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageHeader from "./components/PageHeader.vue";
// import "npmap-symbol-library/www/standalone/npmap-symbol-library-sprite.css";

@Component({
  components: {
    PageHeader
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./scss/global.scss";
@import url("../node_modules/npmap-symbol-library/www/standalone/npmap-symbol-library-sprite.css");

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $vueDefaultText;
  overflow: auto;
  height: 100%;
  // width: 100vw;
  display: flex;
  flex-flow: column;
  margin: 0;
  // margin-top: 60px;
}
</style>
