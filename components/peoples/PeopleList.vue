<template>
  <div
    v-if="list?.length"
    class="w-full bg-blue-600 p-5 border border-yellow-300 rounded-lg text-yellow-300 h-[300px]"
  >
    <div class="px-1 w-full grid grid-cols-people-list mb-5">
      <span>Dni</span>
      <span>Nombres</span>
      <span>Email</span>
      <span>Ciudad</span>
      <span>Ingreso</span>
      <span></span>
    </div>
    <div
      class="w-full flex flex-col divide-y divide-yellow-300 border-t border-yellow-300 text-yellow-50"
    >
      <div
        class="w-full grid grid-cols-people-list px-1 py-2 hover:bg-green-400"
        v-for="(val, index) in list"
        :key="index"
      >
        <span>{{ val?.dni }}</span>
        <span>{{ `${val?.names} ${val?.lastnames}` }}</span>
        <span class="text-ellipsis overflow-hidden pr-2">{{ val?.email }}</span>
        <span>{{ val?.Address?.city }}</span>
        <span>{{ moment(val?.createdAt).format("DD/MM/YYYY") }}</span>
        <span class="ml-1 hover:cursor-pointer font-black" @click="select(val)"
          >></span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref } from "vue";
defineProps({
  list: { type: Array, default: () => [] },
  small: { type: Boolean, default: false },
  customStyle: { type: Object, default: () => {} },
});
const emits = defineEmits(["select"]);
function select(val) {
  emits("select", val);
}
</script>

<style lang="scss" scoped>
.coso {
}
</style>
