<template>
  <div id="app">
    <page-header></page-header>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageHeader from "./components/PageHeader.vue";

@Component({
  components: {
    PageHeader
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
  min-height: 100vh;
  margin: 0;
  // margin-top: 60px;
}
</style>
