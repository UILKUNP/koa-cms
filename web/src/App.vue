<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){
    console.log(this.router)
    
  }
}
</script>

<style lang="less" >
@import "./style/index.less";
</style>