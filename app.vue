<template>
  <div class="container h-screen">
    <Topbar class="tpb" />
    <NuxtPage class="nuxtu h-[calc(100vh-149px)]"></NuxtPage>
    <ModalsContainer />
  </div>
</template>
<script setup>
import { ModalsContainer } from "vue-final-modal";

import Topbar from "@/components/TopBar.vue";
useHead({
  title: "Artile - Administracion",
});
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(201, 219, 225, 1);
}
::-webkit-scrollbar-thumb {
  background-color: rgba(86, 137, 153, 1);
}
.container {
  height: 100vh;
  position: relative;
  background: linear-gradient(180deg, #f7eed1 -4.98%, #33525c 100%);
}
body {
  margin: 0;
  /* font-family: "Red Hat Display", sans-serif; */
  font-family: "Inter", sans-serif;
}
#custom-button {
  /* color: #fff; */
  font-family: "Inter", sans-serif;
  /* font-size: 18px; */
  /* line-height: 22px; */
}
h1 {
  font-weight: 900;
  font-size: 39px;
  line-height: 52px;
}
h3 {
  font-weight: 900;
  font-size: 25px;
  line-height: 33px;
}
.nuxtu {
  padding: 0px 200px;
}
</style>
