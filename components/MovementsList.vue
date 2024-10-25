<template>
  <div
    v-if="movements?.length"
    class="w-full bg-blue-600 p-5 border border-yellow-300 rounded-lg text-yellow-300"
  >
    <div class="px-1 w-full grid grid-cols-header-list mb-5">
      <span>Fecha</span>
      <span> {{ employees ? "Empleado" : "Proveedor" }} </span>
      <span>Numero boleta</span>
      <span>Description</span>
      <span>Valor</span>
      <span>ir</span>
    </div>
    <div
      class="w-full flex flex-col divide-y divide-yellow-300 border-t border-yellow-300 text-yellow-50"
    >
      <div
        class="w-full grid grid-cols-header-list px-1 py-2 hover:bg-green-400"
        v-for="(mov, index) in movements"
        :key="index"
      >
        <span>{{ moment(mov.createdAt).format("DD/MM/YYYY") }}</span>
        <span>{{
          employees
            ? `${mov.People?.names} ${mov.People?.lastnames}`
            : mov.supplier
        }}</span>
        <span>{{ mov.code || mov.id }}</span>
        <span>{{ mov.description }}</span>
        <span>{{ mov.amount }}</span>
        <span class="hover:cursor-pointer" @click="setDetail(mov)">></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { ref } from "vue";

defineProps({
  movements: { type: Array, required: true },
  employees: { type: Boolean, default: false },
});
const emits = defineEmits(["action"]);
function setDetail(mov) {
  emits("action", mov);
}
</script>

<style lang="scss" scoped></style>
