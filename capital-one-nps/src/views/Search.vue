<template>
  <div id="search">
    <search-bar :search-text=search></search-bar>
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
export default class Search extends Vue {
  search:any = "";

  mounted() {
    // console.log(this.$route.query.park);
    this.search = this.$route.query.park;
  }

}
</script>

<style lang="scss" scoped>
.home {
  margin: 0;
  padding: 0;
}
</style>

