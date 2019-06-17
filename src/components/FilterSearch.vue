<template>
  <div class="filter-search">
    <div class="filter-button-row">
      <div class="filter-contain">
        <button
          class="filter-button"
          @click="filterStates()"
          :class="{ selected: filterStatesVisible || filterStatesActive }"
        >States {{ filteredStatesCount ? "-" : "" }} {{ filteredStatesCount }}</button>
        <div class="filter-dialog state-filter" :class="{ hidden: !filterStatesVisible }">
          <div class="filter">
            <state-select
              :clear-all="clearState"
              @updated="(filteredStates = $event), (clearNow = false)"
            ></state-select>
          </div>
          <flat-button class="apply" @click="applyStateFilter()" button-text="APPLY"></flat-button>
        </div>
      </div>
      <div class="filter-contain">
        <button
          class="filter-button"
          @click="filterDesig()"
          :class="{ selected: filterDesigVisible || filterDesigActive }"
        >Designation {{ filteredDesigCount ? "-" : "" }} {{ filteredDesigCount }}</button>
        <div class="filter-dialog desig-filter" :class="{ hidden: !filterDesigVisible }">
          <div class="filter">
            <desig-select
              :clear-all="clearDesig"
              @updated="(filteredDesig = $event), (clearNow = false)"
            ></desig-select>
          </div>
          <flat-button class="apply" @click="applyDesigFilter()" button-text="APPLY"></flat-button>
        </div>
      </div>
      <div class="filter-contain">
        <button
          class="filter-button"
          @click="filterClear()"
          :class="{ selected: filterClearVisible }"
        >Clear</button>
        <div class="filter-dialog clear-filter" :class="{ hidden: !filterClearVisible }">
          <flat-button class="apply" @click="applyClearFilter()" button-text="CLEAR ALL"></flat-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import StateSelect from "./StateSelect.vue";
import DesigSelect from "./DesigSelect.vue";
import FlatButton from "./FlatButton.vue";

@Component({
  components: {
    StateSelect,
    DesigSelect,
    FlatButton
  }
})
export default class FilterSearch extends Vue {
  filteredStates: string[] = [];
  filteredStatesCount = "";
  filterStatesVisible = false;

  filteredDesig: string[] = [];
  filteredDesigCount = "";
  filterDesigVisible = false;

  filterClearVisible = false;

  filterStatesActive = false;
  filterDesigActive = false;

  clearState = false;
  clearDesig = false;

  /**
   * Toggles the states filters dialog and hides other dialogs
   */
  filterStates() {
    this.filterDesigVisible = false;
    this.filterClearVisible = false;
    this.filterStatesVisible = !this.filterStatesVisible;
    this.$emit("dialog", this.filterStatesVisible);
  }

  /**
   * Toggles the designation filters dialog and hides other dialogs
   */
  filterDesig() {
    this.filterStatesVisible = false;
    this.filterClearVisible = false;
    this.filterDesigVisible = !this.filterDesigVisible;
    this.$emit("dialog", this.filterDesigVisible);
  }

  /**
   * Toggles the clear filters dialog and hides other dialogs
   */
  filterClear() {
    this.filterStatesVisible = false;
    this.filterDesigVisible = false;
    this.filterClearVisible = !this.filterClearVisible;
    this.$emit("dialog", this.filterClearVisible);
  }

  /**
   * Applies the state filters by emitting state-apply and updating button style
   */
  applyStateFilter() {
    this.filteredStatesCount = "";
    this.filterStatesActive = false;
    if (this.filteredStates.length > 0) {
      this.filteredStatesCount = this.filteredStates.length + "";
      this.filterStatesActive = true;
    }
    this.$emit("state-apply", this.filteredStates);
  }

  /**
   * Applies the designation filters by emitting desig-apply and updating button style
   */
  applyDesigFilter() {
    this.filteredDesigCount = "";
    this.filterDesigActive = false;
    if (this.filteredDesig.length > 0) {
      this.filteredDesigCount = this.filteredDesig.length + "";
      this.filterDesigActive = true;
    }
    this.$emit("desig-apply", this.filteredDesig);
  }

  /**
   * Applies the clear filters by emitting clear-apply and updating props to clear checkboxes
   */
  applyClearFilter() {
    this.filterClearVisible = false;
    this.filterDesigActive = false;
    this.filterStatesActive = false;
    this.filteredStates = [];
    this.filteredDesig = [];
    this.filteredStatesCount = "";
    this.filteredDesigCount = "";
    this.clearState = true;
    this.clearDesig = true;
    this.$emit("clear-apply");
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

.filter-button-row {
  width: 55%;
  margin: 0 auto;
  text-align: left;

  @media (max-width: 768px) {
    width: 75%;
  }

  @media (max-width: 576px) {
    width: 90%;
  }
}

.filter-contain {
  display: inline-block;
}

.filter-button {
  background: #fff;
  border-radius: 5px;
  border: 1px solid #dedede;
  margin: 0 0.5rem 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #dedede;
  }

  &.selected {
    background: $colorAccentDark;
    border: 1px solid $colorAccentDark;
    color: #fff;
  }
}

.filter-dialog {
  background: #fff;
  text-align: center;
  position: absolute;
  // top: 17rem;
  margin: 0 0.5rem;
  z-index: 10;
  border-radius: 7px;
  border: 1px solid #eee;
  padding: 0 0 1rem;
  width: 35%;
  @extend %default-shadow;

  &.clear-filter {
    width: 10rem;
    padding: 1rem 0;
  }

  @media (max-width: 992px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 90%;
  }
}

.filter {
  height: 15rem;
  overflow: scroll;
  margin: 2rem 0 1rem;
}

.hidden {
  display: none;
}

.apply {
  padding: 0 1rem;
}
</style>
