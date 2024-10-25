<template>
  <div v-if="show" class="flex justify-center gap-3 h-[200px] w-full mt-16">
    <span class="font-bold text-white"
      >No tenemos resultados para esa busqueda</span
    >
  </div>
</template>

<script setup>
const props = defineProps({ result: { type: Array, default: null } });
const show = computed(() => {
  if (!props?.result) return false;
  return props?.result?.length === 0;
});
</script>
