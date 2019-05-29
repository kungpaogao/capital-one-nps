<template>
  <div id="home">
    <search-bar class="search"></search-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchBar from "../components/SearchBar.vue";
import axios from "axios";

@Component({
  components: {
    SearchBar
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  margin: 0;
  padding: 0;
}

.search {
  margin: 10% auto;
}
</style>

