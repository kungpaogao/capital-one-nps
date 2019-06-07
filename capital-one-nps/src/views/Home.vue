<template>
  <div id="home">
    <search-bar class="search"></search-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchBar from "../components/SearchBar.vue";

@Component({
  components: {
    SearchBar
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
#home {
  flex-grow: 1;
  margin: 0;
  padding: 0;
  // background-image: url("https://www.nps.gov/npgallery/GetAsset/840EA389-1DD8-B71C-07B58F3C198B0387");
  background-image: url("https://www.nps.gov/npgallery/GetAsset/2D26D223-1DD8-B71C-07C923F9B774BBB9");
  overflow: hidden;
  background-size: cover;
}

.search {
  margin: 10% auto;
}
</style>

