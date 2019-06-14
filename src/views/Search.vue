<template>
  <div class="search-page">
    <search-bar class="search-bar" :search-text="search" v-on:search="getSearch()"></search-bar>
    <filter-search
      v-on:state-apply="(filteredStates = $event), applyFilters()"
      v-on:desig-apply="(filteredDesig = $event), applyFilters()"
      v-on:clear-apply="
        (filteredStates = []), (filteredDesig = []), applyFilters()
      "
    ></filter-search>
    <div class="result-container">
      <!-- <h2 class="no-results" :class="{hidden: hasResults}"></h2> -->
      <div v-for="park in display" class="result" :key="park.id">
        <h2 class="park-link" v-on:click="goToPark(park.parkCode)">{{ park.fullName }}</h2>
        <h3 class="park-desig">
          {{ park.designation ? park.designation : "Site" }} in
          {{ park.states.replace(/,/g, ", ") }}
        </h3>
        <p class="park-desc">{{ park.description }}</p>
        <!-- <flat-button></flat-button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchBar from "../components/SearchBar.vue";
import FilterSearch from "../components/FilterSearch.vue";
import FlatButton from "../components/FlatButton.vue";
import axios from "axios";
import { ResultImage, Result } from "../data/TypesData";

@Component({
  components: {
    SearchBar,
    FilterSearch,
    FlatButton
  }
})
export default class Search extends Vue {
  search: any = "";
  stateSearch: any = "";
  results: Array<Result> = [];
  display: Array<Result> = [];
  filteredStates: string[] = [];
  filteredDesig: string[] = [];
  hasResults = false;

  baseURL = process.env.VUE_APP_BASE_URL;
  apiKey = process.env.VUE_APP_API_KEY;

  /**
   * Applies filters for state and designation. State filtering is achieved
   * through an API call, while designation filtering is done locally.
   */
  applyFilters() {
    // console.log(this.filteredStates);
    const filterStates = this.filteredStates.toString();
    const filterDesig = this.filteredDesig.toString();

    if (filterDesig && filterStates) {
      console.log("both filters active");
      this.display = this.intersect(
        this.results.filter(result => this.isDesig(result)),
        this.results.filter(result => this.isState(result))
      );
    } else if (filterDesig) {
      console.log("desig filter active");
      this.display = this.results.filter(result => this.isDesig(result));
    } else if (filterStates) {
      console.log("state filter active");
      this.display = this.results.filter(result => this.isState(result));
    } else {
      this.display = this.results;
    }
  }

  /**
   * Returns an array that is the intersect of parameters array1 and array2
   */
  intersect(array1: Array<any>, array2: Array<any>) {
    return array1.filter(x => array2.includes(x));
  }

  /**
   * Returns whether or not a result's designation is included in the
   * filtered designations.
   */
  isDesig(result: Result) {
    console.log("EMPTY STRING TEST" + this.filteredDesig.includes(""));
    return this.filteredDesig.includes(result.designation);
  }

  /**
   * Returns whether or not a result's states are included in the filtered
   * states.
   */
  isState(result: Result) {
    const resultStates = result.states.split(",");
    const mapStates = resultStates.map(s => this.filteredStates.includes(s));
    return mapStates.reduce((x, y) => x || y);
  }

  /**
   * Searches using NPS API, initializing search class variable and calls
   * applyFilters() as necessary.
   */
  getSearch() {
    // only search using the first term because of API limitations
    this.search = this.$route.query.park;
    let searchTerm = "";
    if (this.search) searchTerm = this.search.split(" ")[0];

    this.stateSearch = this.$route.query.state;

    if (this.search) {
      axios
        .get(this.baseURL + "parks?q=" + searchTerm + this.apiKey)
        .then(
          response => (
            (this.results = response.data.data),
            (this.hasResults = true),
            this.applyFilters()
          )
        );
    } else if (this.stateSearch) {
      axios
        .get(this.baseURL + "parks?stateCode=" + this.stateSearch + this.apiKey)
        .then(
          response => (
            (this.results = response.data.data),
            (this.hasResults = true),
            this.applyFilters()
          )
        );
      this.search = this.stateSearch;
    }
  }

  mounted() {
    this.getSearch();
  }

  goToPark(code: string) {
    this.$router.push({
      name: "park",
      query: { code: code }
    });
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";
$content-margin-left: 10%;

.search-bar {
  // margin: 2% $content-margin-left;
  margin: 2% auto;
}

.result-container {
  text-align: center;
  // margin-left: $content-margin-left;
}

.result {
  display: inline-block;
  padding: 1rem 2rem;
  text-align: left;
  background: #fff;
  border: 1px solid #eee;
  width: 50%;
  margin-bottom: 1.5rem;
  border-radius: 7px;
  @extend %default-shadow-lower;
  transition: box-shadow 0.2s;

  // &:hover {
  //   @extend %default-shadow;
  //   border: 1px solid #eee;
  // }
}

.park-link {
  display: inline-block;
  border-bottom: 1px solid transparent;
  transition: border-color 0.5s;

  &:hover {
    border-color: $vueDefaultText;
    cursor: pointer;
  }
}

.park-desig {
  margin-top: 0;
  // font-style: italic;
}

// .park-states {
//   font-weight: bold;
// }

.hidden {
  display: none;
}
</style>
