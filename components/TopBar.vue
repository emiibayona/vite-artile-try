divdiv
<template>
  <div>
    <div
      id="topbar"
      class="bg-green-300 h-[149px] flex flex-row justify-between items-center px-5 w-full"
    >
      <nuxt-img
        class="cursor-pointer"
        src="/logo.png"
        @click="router.push('/')"
      />
      <div
        class="flex flex-row justify-between gap-2 h-fit w-full ml-[50px] sm:ml-[100px]"
      >
        <div class="flex flex-row justify-between gap-2 h-fit">
          <CustomDropdown
            class="sm:w-[300px] w-[150px]"
            :selected="selectedDrop"
            placeholder="Matriculas"
            :options="[
              {
                name: 'Matricular',
                id: 10,
                path: 'students/?create=true',
              },
              {
                name: 'Busqueda de Alumnos Matriculados',
                id: 11,
                path: 'registered',
              },
            ]"
            vanilla
            max-width="60"
            @select="navigateTo"
          />
          <CustomDropdown
            class="sm:w-[300px] w-[150px]"
            :selected="selectedDrop"
            placeholder="Movimientos"
            :options="[
              {
                name: 'Cobro de Matriculados',
                id: 1,
                path: 'payments',
              },
              { name: 'Pagos proveedores', id: 2, path: 'bills/suppliers' },
              { name: 'Pago salarios', id: 3, path: 'bills/employees' },
            ]"
            vanilla
            max-width="60"
            @select="navigateTo"
          />
          <CustomDropdown
            class="sm:w-[300px] w-[150px]"
            :selected="selectedDrop"
            placeholder="Listados"
            :options="[
              { name: 'Listado de salidas', id: 4, path: 'movements/out' },
              { name: 'Lista de entradas', id: 5, path: 'movements/in' },
              {
                name: 'Listado de salarios',
                id: 6,
                path: 'movements/salaries',
              },
            ]"
            vanilla
            max-width="60"
            @select="navigateTo"
          />
        </div>
      </div>
    </div>
    <div
      v-if="route.path !== '/'"
      class="pt-3 px-3 flex flex-row gap-1 items-center cursor-default"
    >
      <nuxt-img
        class="w-[30px] h-[30px] cursor-pointer"
        src="/icons/left-arrow.svg"
        @click="router.go(-1)"
      />
      <span class="font-bold text-blue-600">{{ info }}</span>
    </div>
  </div>
</template>
<script setup>
import CustomDropdown from "@/components/elements/CustomDropdown.vue";

import { useRoute, useRouter } from "#app";
import { computed, ref } from "vue";
import usePeoples from "@/composables/usePeoples";

const route = useRoute();
const router = useRouter();
const { currentStudent } = usePeoples();

function navigateTo(va) {
  if (!va.path) {
    return router.push("/");
  }
  router.push(`/${va?.path || ""}`);
}
const routing = computed(() => {
  return route?.fullPath.replace("/", "").replace(/\d+/g, "");
});

const namings = computed(() => ({
  payments: "Cobro de matriculados",
  "bills/suppliers": "Pago proveedores",
  "bills/employees": "Pago salarios",
  "movements/out": "Listado de salidas",
  "movements/in": "Listado de entradas",
  "movements/salaries": "Listado de salarios",
  "students/?create=true": "Matricular",
  "students/": "Alumno",
  "students//?plan=true": "Agregar planes",
  "students//?edit=true": `Editando ${currentStudent?.value?.names}`,
  registered: "Listado de alumnos",
}));

const info = computed(() => {
  if (!routing?.value) return "";
  return `${namings.value[routing?.value] || ""}`;
});
</script>
<style scoped lang="scss">
#topbar {
  img {
    height: 120px;
  }
}
</style>
