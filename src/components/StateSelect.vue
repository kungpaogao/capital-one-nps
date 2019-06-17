<template>
  <div class="state-select">
    <button class="toggle-all" :hidden="isCheckAll" v-on:click="checkAll()">CHECK ALL</button>
    <button class="toggle-all" :hidden="!isCheckAll" v-on:click="checkAll()">CLEAR</button>
    <ul class="state-list">
      <li v-for="state in statesData" :key="state.abbr">
        <input
          type="checkbox"
          :value="state.abbr"
          v-model="selectedStates"
          v-on:change="$emit('updated', selectedStates)"
        >
        {{ state.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { StatesData } from "../data/StatesData";

@Component
export default class StateSelect extends Vue {
  selectedStates: string[] = [];
  statesData = StatesData;
  isCheckAll = false;

  @Prop({ default: false })
  clearAll!: boolean;

  @Watch("clearAll")
  onClearAllChanged() {
    console.log("STATE CLEAR ALL PROP");
    this.isCheckAll = false;
    this.selectedStates = [];
    this.$emit("updated", this.selectedStates);
    // this.clearAll = false;
  }

  checkAll() {
    this.isCheckAll = !this.isCheckAll;
    this.selectedStates = [];
    if (this.isCheckAll) {
      for (var state in this.statesData) {
        this.selectedStates.push(this.statesData[state].abbr);
      }
    }
    this.$emit("updated", this.selectedStates);
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

.state-select {
  background: none;
  text-align: left;
  padding: 0 1rem;
}

.state-list {
  margin-left: -1.5rem;
  list-style-type: none;
  text-align: left;
  column-count: 3;

  @media (max-width: 768px) {
    column-count: 2;
  }

  @media (max-width: 576px) {
    column-count: 1;
  }
}

.toggle-all {
  @extend %flat-button;
}
</style>
