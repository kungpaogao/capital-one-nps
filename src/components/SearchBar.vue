<template>
  <div class="search-bar">
    <input
      type="text"
      class="search-input"
      list="states"
      :placeholder="searchText"
      v-model="search"
      v-on:keyup.enter="goToSearch(), $emit('search')"
      v-focus
    >
    <button class="search-button" v-on:click="goToSearch(), $emit('search')">
      <i class="material-icons">search</i>
    </button>

    <datalist id="states">
      <option v-for="state in statesData" :key="state.abbr" :value="state.abbr">{{ state.name }}</option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { StatesData } from "../data/StatesData";

@Component
export default class SearchBar extends Vue {
  @Prop({ default: "" }) searchText!: string;
  statesData = StatesData;
  statesAbbr = this.statesData.map(state => state.abbr);
  statesName = this.statesData.map(state => state.name);
  search = "";
  stateSearch = false;

  @Watch("search")
  onSearchChanged() {
    if (this.searchIsState()) {
      this.stateSearch = true;
    } else {
      this.stateSearch = false;
    }
  }

  searchIsState() {
    return (
      this.statesAbbr.includes(this.search) ||
      this.statesName.includes(this.search)
    );
  }

  toAbbr(search: string) {
    if (this.statesAbbr.includes(search)) return search;
    else if (this.statesName.includes(search)) {
      const index = this.statesName.indexOf(search);
      return this.statesAbbr[index];
    } else {
      return search;
    }
  }

  goToSearch() {
    console.log("Searching...");
    const search = this.toAbbr(this.search);
    const query = this.stateSearch ? { state: search } : { park: search };
    if (this.search) {
      this.$router.push({
        name: "search",
        query: query
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

.search-bar {
  background: #fff;
  height: 3.6rem;
  width: 60%;
  min-width: 15rem;
  border-radius: 7px;
  border: 1px solid #ccc;
  text-align: left;
  transition: box-shadow 0.3s;
  vertical-align: middle;

  &:focus,
  &:hover {
    // border: 1px solid #eee;
    @extend %default-shadow;
  }

  &:hover .search-button {
    background: #ccc;
    transition: background 0.3s;
  }

  @media (max-width: $smallMedia) {
    width: 75%;
  }

  @media (max-width: $extraSmallMedia) {
    width: 90%;
  }
}

.search-input {
  box-sizing: border-box;
  height: 100%;
  width: 90%;
  font-size: 1.3rem;
  padding: 1rem 1rem;
  border: none;
  border-radius: 7px;

  @media (max-width: $smallMedia) {
    width: 80%;
  }

  @media (max-width: $extraSmallMedia) {
    width: 75%;
  }
}

.search-button {
  text-align: center;
  width: 10%;
  height: 100%;
  float: right;
  display: block;
  // padding: 1rem 2rem;
  background: #eee;
  border: none;
  border-radius: 0 5px 5px 0;

  @media (max-width: $smallMedia) {
    width: 20%;
  }

  @media (max-width: $extraSmallMedia) {
    width: 25%;
  }
}

.material-icons {
  font-size: 1.7rem;
}
</style>
