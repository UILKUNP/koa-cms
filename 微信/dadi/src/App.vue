<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import auth from "@mixins/auth";
export default {
  mixins: [auth],
};
</script>
<style lang="scss">
@import "../main.scss";
</style>
