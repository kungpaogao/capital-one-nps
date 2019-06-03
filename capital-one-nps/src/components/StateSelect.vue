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

@Component
export default class StateSelect extends Vue {
  selectedStates: string[] = [];
  statesData = [
    {
      name: "Alabama",
      abbr: "AL"
    },
    {
      name: "Alaska",
      abbr: "AK"
    },
    {
      name: "American Samoa",
      abbr: "AS"
    },
    {
      name: "Arizona",
      abbr: "AZ"
    },
    {
      name: "Arkansas",
      abbr: "AR"
    },
    {
      name: "California",
      abbr: "CA"
    },
    {
      name: "Colorado",
      abbr: "CO"
    },
    {
      name: "Connecticut",
      abbr: "CT"
    },
    {
      name: "Delaware",
      abbr: "DE"
    },
    {
      name: "District Of Columbia",
      abbr: "DC"
    },
    {
      name: "Federated States Of Micronesia",
      abbr: "FM"
    },
    {
      name: "Florida",
      abbr: "FL"
    },
    {
      name: "Georgia",
      abbr: "GA"
    },
    {
      name: "Guam",
      abbr: "GU"
    },
    {
      name: "Hawaii",
      abbr: "HI"
    },
    {
      name: "Idaho",
      abbr: "ID"
    },
    {
      name: "Illinois",
      abbr: "IL"
    },
    {
      name: "Indiana",
      abbr: "IN"
    },
    {
      name: "Iowa",
      abbr: "IA"
    },
    {
      name: "Kansas",
      abbr: "KS"
    },
    {
      name: "Kentucky",
      abbr: "KY"
    },
    {
      name: "Louisiana",
      abbr: "LA"
    },
    {
      name: "Maine",
      abbr: "ME"
    },
    {
      name: "Marshall Islands",
      abbr: "MH"
    },
    {
      name: "Maryland",
      abbr: "MD"
    },
    {
      name: "Massachusetts",
      abbr: "MA"
    },
    {
      name: "Michigan",
      abbr: "MI"
    },
    {
      name: "Minnesota",
      abbr: "MN"
    },
    {
      name: "Mississippi",
      abbr: "MS"
    },
    {
      name: "Missouri",
      abbr: "MO"
    },
    {
      name: "Montana",
      abbr: "MT"
    },
    {
      name: "Nebraska",
      abbr: "NE"
    },
    {
      name: "Nevada",
      abbr: "NV"
    },
    {
      name: "New Hampshire",
      abbr: "NH"
    },
    {
      name: "New Jersey",
      abbr: "NJ"
    },
    {
      name: "New Mexico",
      abbr: "NM"
    },
    {
      name: "New York",
      abbr: "NY"
    },
    {
      name: "North Carolina",
      abbr: "NC"
    },
    {
      name: "North Dakota",
      abbr: "ND"
    },
    {
      name: "Northern Mariana Islands",
      abbr: "MP"
    },
    {
      name: "Ohio",
      abbr: "OH"
    },
    {
      name: "Oklahoma",
      abbr: "OK"
    },
    {
      name: "Oregon",
      abbr: "OR"
    },
    {
      name: "Palau",
      abbr: "PW"
    },
    {
      name: "Pennsylvania",
      abbr: "PA"
    },
    {
      name: "Puerto Rico",
      abbr: "PR"
    },
    {
      name: "Rhode Island",
      abbr: "RI"
    },
    {
      name: "South Carolina",
      abbr: "SC"
    },
    {
      name: "South Dakota",
      abbr: "SD"
    },
    {
      name: "Tennessee",
      abbr: "TN"
    },
    {
      name: "Texas",
      abbr: "TX"
    },
    {
      name: "Utah",
      abbr: "UT"
    },
    {
      name: "Vermont",
      abbr: "VT"
    },
    {
      name: "Virgin Islands",
      abbr: "VI"
    },
    {
      name: "Virginia",
      abbr: "VA"
    },
    {
      name: "Washington",
      abbr: "WA"
    },
    {
      name: "West Virginia",
      abbr: "WV"
    },
    {
      name: "Wisconsin",
      abbr: "WI"
    },
    {
      name: "Wyoming",
      abbr: "WY"
    }
  ];
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
}

.state-list {
  list-style-type: none;
  text-align: left;
  column-count: 3;
}

.toggle-all {
  @extend %flat-button;
}
</style>
