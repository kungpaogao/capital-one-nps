<template>
  <ul class="nav-group">
    <li class="word-logo">
      <a href="/" class="link">
        <img class="icon" src="../assets/logo.png">National Parks
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="search">Search</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="about">About</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PageHeader extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

.nav-group {
  @extend %default-shadow;
  background: #000;
  color: #fff;
  text-align: right;
  list-style-type: none;
  margin: 0;
  padding: 1rem;
  color: #fff;
  vertical-align: middle;
}

.word-logo {
  display: block;
  float: left;
  font-size: 1.7rem;
  font-weight: bold;
  line-height: 3rem;

  .icon {
    vertical-align: middle;
    height: 1.7rem;
    margin-right: 1rem;
  }

  .link {
    text-decoration: none;
    color: #fff;
  }
}

.nav-item {
  // margin-left: 2rem;
  display: inline-block;
}

.nav-link {
  padding: 0 1rem;
  display: block;
  color: #ccc;
  text-decoration: none;
  text-align: center;
  line-height: 3rem;
  font-size: 1.2rem;
  font-weight: 700;
  transition: color 0.3s;

  &:hover {
    // background-color: gray;
    color: #fff;
  }
}
</style>
