<template>
  <div class="search-bar">
    <input
      type="text"
      class="search-input"
      list="states"
      :placeholder="searchText"
      v-model="search"
      v-on:keyup.enter="goToSearch(), $emit('search')"
    >
    <button class="search-button" v-on:click="goToSearch(), $emit('search')">
      <i class="material-icons">search</i>
    </button>

    <datalist id="states">
      <option value="AL">Alabama</option>
      <option value="AK">Alaska</option>
      <option value="AZ">Arizona</option>
      <option value="AR">Arkansas</option>
      <option value="CA">California</option>
      <option value="CO">Colorado</option>
      <option value="CT">Connecticut</option>
      <option value="DE">Delaware</option>
      <option value="DC">District Of Columbia</option>
      <option value="FL">Florida</option>
      <option value="GA">Georgia</option>
      <option value="HI">Hawaii</option>
      <option value="ID">Idaho</option>
      <option value="IL">Illinois</option>
      <option value="IN">Indiana</option>
      <option value="IA">Iowa</option>
      <option value="KS">Kansas</option>
      <option value="KY">Kentucky</option>
      <option value="LA">Louisiana</option>
      <option value="ME">Maine</option>
      <option value="MD">Maryland</option>
      <option value="MA">Massachusetts</option>
      <option value="MI">Michigan</option>
      <option value="MN">Minnesota</option>
      <option value="MS">Mississippi</option>
      <option value="MO">Missouri</option>
      <option value="MT">Montana</option>
      <option value="NE">Nebraska</option>
      <option value="NV">Nevada</option>
      <option value="NH">New Hampshire</option>
      <option value="NJ">New Jersey</option>
      <option value="NM">New Mexico</option>
      <option value="NY">New York</option>
      <option value="NC">North Carolina</option>
      <option value="ND">North Dakota</option>
      <option value="OH">Ohio</option>
      <option value="OK">Oklahoma</option>
      <option value="OR">Oregon</option>
      <option value="PA">Pennsylvania</option>
      <option value="RI">Rhode Island</option>
      <option value="SC">South Carolina</option>
      <option value="SD">South Dakota</option>
      <option value="TN">Tennessee</option>
      <option value="TX">Texas</option>
      <option value="UT">Utah</option>
      <option value="VT">Vermont</option>
      <option value="VA">Virginia</option>
      <option value="WA">Washington</option>
      <option value="WV">West Virginia</option>
      <option value="WI">Wisconsin</option>
      <option value="WY">Wyoming</option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SearchBar extends Vue {
  @Prop({ default: "Search the National Parks" }) searchText!: string;
  search = "";

  goToSearch() {
    console.log("Searching...");
    if (this.search) {
      this.$router.push({
        name: "search",
        query: { park: this.search }
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
}

.search-input {
  box-sizing: border-box;
  width: 90%;
  font-size: 1.3rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 7px;
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
}

.material-icons {
  font-size: 1.7rem;
}
</style>
