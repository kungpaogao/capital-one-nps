<template>
  <div class="flat-button-container">
    <button class="flat-button" v-on:click="$emit('click')">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class FlatButton extends Vue {
  @Prop({ default: "EXPLORE" }) buttonText!: string;
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

.flat-button-container {
  text-align: inherit;
}

.flat-button {
  @extend %flat-button;
}
</style>
