<template>
  <div class="w-p-100 flex-al al-c">
    <div class="w-750 h-150  font-24 c-000 flex-row al-c topbg p-l-34">
      <img class="w-311" src="@imgs/bg1.png" alt="" />
    </div>
    <div class="w-750 m-t-36 flex-al al-c j-c">
      <img src="@imgs/bg2.png" class="w-333" alt="" />
    </div>
    <div class="w-750 h-745 flex-al al-c j-c m-t-36">
      <div class="flex-al al-c j-c w-700 h-745  p-l-6 p-r-6 emoji-main">
        <div class="flex-al al-c j-c w-p-100 h-739 m-t-6 emoji-main-outborder">
          <img src="@imgs/bg3.png" class="w-p-90" alt="" />
        </div>
      </div>
    </div>
    <img src="@imgs/bg4.png" class="w-750" alt="" />
    <img src="@imgs/bg5.png" class="w-750" alt="" />
    <div class="h-130"></div>
    <div class="h-130 w-750 footer flex-row j-sb al-c p-l-35 p-r-25">
      <span class="font-27" style="color:#f0ad4e">购买记录</span>
      <img src="@imgs/icon1.png" class="w-240 hover-big" alt="" />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
<style lang="scss">
.topbg {
  background: rgba(255, 255, 255, 0.04);
}
.footer {
  background: #202029;
  position: fixed;
  bottom: 0;
  left: 0;
}
.emoji-main {
  border-radius: 38px 38px 0 0;
  background: linear-gradient(
    0deg,
    rgba(61, 247, 249, 1),
    rgba(247, 135, 31, 1)
  );
  .emoji-main-outborder {
    border-radius: 32px 32px 0 0;
    background: #202029;
  }
}
</style>
