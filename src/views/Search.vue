<template>
  <div :class="['search-page', { 'no-scroll': dialogVisible }]">
    <search-bar
      class="search-bar"
      :search-text="search"
      @search="getSearch()"
    ></search-bar>
    <filter-search
      @state-apply="(filteredStates = $event), applyFilters()"
      @desig-apply="(filteredDesig = $event), applyFilters()"
      @clear-apply="(filteredStates = []), (filteredDesig = []), applyFilters()"
      @dialog="dialogVisible = $event"
    ></filter-search>
    <div class="result-container">
      <div v-if="dialogVisible" class="dialog-overlay"></div>
      <!-- <h2 class="no-results" :class="{hidden: hasResults}"></h2> -->
      <div v-for="park in display" class="result" :key="park.id">
        <h2 class="park-link" @click="goToPark(park.parkCode)">
          {{ park.fullName }}
        </h2>
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
  dialogVisible = false;

  baseURL = process.env.VUE_APP_BASE_URL;
  apiKey = process.env.VUE_APP_API_KEY;

  /**
   * Applies filters for state and designation. State filtering is achieved
   * through an API call, while designation filtering is done locally.
   */
  applyFilters() {
    const filterStates = this.filteredStates.toString();
    const filterDesig = this.filteredDesig.toString();

    if (filterDesig && filterStates) {
      this.display = this.intersect(
        this.results.filter(result => this.isDesig(result)),
        this.results.filter(result => this.isState(result))
      );
    } else if (filterDesig) {
      this.display = this.results.filter(result => this.isDesig(result));
    } else if (filterStates) {
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

  /**
   * Gets search on page load.
   */
  mounted() {
    this.getSearch();
  }

  /**
   * Navigates to park with given park code.
   */
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
  overflow: hidden;
}

.result {
  box-sizing: border-box;
  display: inline-block;
  padding: 1rem 2rem;
  text-align: left;
  background: #fff;
  border: 1px solid #eee;
  width: 57%;
  margin-bottom: 1.5rem;
  border-radius: 7px;
  @extend %default-shadow-lower;
  transition: box-shadow 0.2s;

  // &:hover {
  //   @extend %default-shadow;
  //   border: 1px solid #eee;
  // }
  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 576px) {
    width: 90%;
  }
}

.park-link {
  display: inline-block;
  border-bottom: 1px solid transparent;
  transition: border-color 0.5s;

  &:hover {
    border-color: $vueDefaultText;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    // text-decoration: underline;
    color: $colorAccentPrimary;
  }

  @media (max-width: 576px) {
    // text-decoration: underline;
    color: $colorAccentPrimary;
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

.no-scroll {
  overflow: hidden;
}

.dialog-overlay {
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
