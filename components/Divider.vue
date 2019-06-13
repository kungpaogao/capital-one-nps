<template>
  <div class="divider">
    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Divider extends Vue {}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

.divider {
  margin: 5rem 0;
  width: 100%;
}

.line {
  color: #ddd;
  border-bottom: 1.5px solid;
}
</style>
