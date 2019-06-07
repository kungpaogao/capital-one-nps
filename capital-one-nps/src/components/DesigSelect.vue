<template>
  <div class="desig-select">
    <button class="toggle-all" :hidden="isCheckAll" v-on:click="checkAll()">CHECK ALL</button>
    <button class="toggle-all" :hidden="!isCheckAll" v-on:click="checkAll()">CLEAR</button>
    <ul class="desig-list">
      <li v-for="desig in desigData" :key="desig.abbr">
        <input
          type="checkbox"
          :value="desig.name"
          v-model="selectedDesig"
          v-on:change="$emit('updated', selectedDesig)"
        >
        {{ desig.name == "" ? "None/Other" : desig.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class DesigSelect extends Vue {
  selectedDesig: string[] = [];
  desigData = [
    { name: "National Park", abbr: "NP" },
    { name: "National Preserve", abbr: "NPRES" },
    { name: "National Reserve", abbr: "NRES" },
    { name: "National Recreation Area", abbr: "NRA" },
    { name: "National Battlefield", abbr: "NB" },
    { name: "National Battlefield Park", abbr: "NBP" },
    { name: "National Battlefield Site", abbr: "NBS" },
    { name: "National Military Park", abbr: "NMP" },
    { name: "National Memorial", abbr: "NMEM" },
    { name: "National Monument", abbr: "NM" },
    { name: "National River", abbr: "NR" },
    { name: "National Lakeshore", abbr: "NL" },
    { name: "National Seashore", abbr: "NS" },
    { name: "National Parkway", abbr: "PKWY" },
    { name: "National Trail", abbr: "NST" },
    { name: "National Historic Site", abbr: "NHS" },
    { name: "National Historical Park", abbr: "NHP" },
    { name: "International Historic Site", abbr: "IHS" },
    { name: "", abbr: "NA" }
  ];
  isCheckAll = false;

  @Prop({ default: false })
  clearAll!: boolean;

  @Watch("clearAll")
  onClearAllChanged() {
    console.log("DESIG CLEAR ALL PROP");

    this.isCheckAll = false;
    this.selectedDesig = [];
    this.$emit("updated", this.selectedDesig);
    // this.clearAll = false;
  }

  checkAll() {
    this.isCheckAll = !this.isCheckAll;
    this.selectedDesig = [];
    if (this.isCheckAll) {
      for (var desig in this.desigData) {
        this.selectedDesig.push(this.desigData[desig].name);
      }
    }
    this.$emit("updated", this.selectedDesig);
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

.desig-select {
  background: none;
  text-align: left;
}

.desig-list {
  list-style-type: none;
  text-align: left;
  column-count: 3;
}

.toggle-all {
  @extend %flat-button;
}
</style>
