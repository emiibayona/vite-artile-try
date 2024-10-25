<template>
  <div class="w-full h-[calc(100vh-95px)]">
    <nuxt-child />
    <div class="flex flex-col items-center justify-center">
      <h2 class="mb-10">Utiliza el menu superior para navegar</h2>
    </div>
  </div>
</template>
<script setup>
import CustomButton from "~/components/elements/CustomButton.vue";
</script>
<style>
/*  */
</style>
