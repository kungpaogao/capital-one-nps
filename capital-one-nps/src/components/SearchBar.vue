<template>
  <div>
    <input
      type="text"
      class="search-bar"
      list="search-results"
      :placeholder=searchText
      v-model="search"
      v-on:keyup.enter="goToSearch()"
    >
    <datalist id="search-results">
      <option v-for="park in info" class="park-result" :key="park.id">{{ park.fullName }}</option>
    </datalist>

    <!-- <select class="suggest" v-model="search">
        <option>Loading search results...</option>
        <option v-for="park in info" class="park-result" :key="park.id">{{ park.fullName }}</option>
    </select>-->

    <!-- <button v-on:click="handler()">api test</button> -->
    <!-- <h1>search results</h1>
    <div v-for="park in info" class="park-result" :key="park.id">
      <h2>{{ park.fullName }}</h2>
      <p>hello {{park.id}}</p>
    </div>
    <h1>full response</h1>
    <p>{{ info }}</p>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class SearchBar extends Vue {
  @Prop({default: "Search the National Parks"}) searchText!: string;
  search = "";
  info: any = "";
  baseURL = process.env.VUE_APP_BASE_URL;
  apiKey = process.env.VUE_APP_API_KEY;
  // response = "";

  handler() {
    // console.log(process.env.VUE_APP_NPS_API);
    // console.log(process.env.VUE_APP_BASE_URL);
    console.log(this.baseURL + "parks?q=" + this.search + this.apiKey);
    if (this.search) {
      axios
        .get(this.baseURL + "parks?q=" + this.search + this.apiKey)
        .then(response => (this.info = response.data.data));
    }
  }

  goToSearch() {
    console.log("Searching...");
    if (this.search) {
      this.$router.push({
      name: "search", query: { park: this.search }
    });
      // axios
      //   .get(this.baseURL + "parks?q=" + this.search + this.apiKey)
      //   .then(
      //     response => (
      //       (this.info = response.data.data), (this.showSuggestions = true)
      //     )
      //   );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

.search-bar {
  width: 50%;
  border-radius: 7px;
  border: 1px solid #ccc;
  font-size: 1.3rem;
  padding: 1rem 2rem;
  transition: box-shadow 0.3s;

  &:focus,
  &:hover {
    border: 1px solid #eee;
    @extend %default-shadow;
  }
}
</style>
