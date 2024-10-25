<template>
  <div v-if="detail" class="flex flex-col gap-3">
    <span
      v-if="list"
      class="text-black flex flex-row gap-1 items-center cursor-pointer font-bold"
      @click="back"
    >
      <nuxt-img class="w-[20px] h-[20px]" src="/icons/yellow/left-arrow.svg" />

      Volver al listado</span
    >
    <div
      class="relative w-full flex flex-col bg-blue-500 border gap-6 border-blue-200 rounded-lg p-10 text-yellow-50"
    >
      <span class="font-extrabold text-lg">
        {{ type }}
      </span>
      <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col gap-6">
          <p :class="pClass">
            {{ "Fecha:" }}
            <span :class="spanClass">{{
              moment(detail?.createdAt).format("DD/MM/YYYY")
            }}</span>
          </p>
          <p v-if="detail?.Entity" :class="pClass">
            {{ "Entidad:" }}
            <span :class="spanClass">{{ detail?.Entity?.names }}</span>
          </p>
          <p v-if="detail?.People" :class="pClass">
            {{ "Entidad:" }}
            <span :class="spanClass">{{ detail?.People?.names }}</span>
          </p>
          <p :class="pClass">
            {{ "Institucion:" }}
            <span :class="spanClass">{{ detail?.Center?.name }}</span>
          </p>
        </div>
        <div class="flex flex-col gap-6">
          <p :class="pClass">
            {{ "Medio de pago:" }}
            <span :class="spanClass">{{ detail?.paymentMethod }}</span>
          </p>
          <p :class="pClass">
            {{ "Monto:" }}
            <span :class="spanClass">{{ detail?.amount }}</span>
          </p>
        </div>
      </div>
      <p :class="pClass">
        {{ "Descripcion:" }}
        <span :class="spanClass">{{ detail?.description }}</span>
      </p>
    </div>
    <p
      v-if="detail.invoice"
      class="font-bold text-yellow-400 hover:cursor-pointer flex flex-row gap-2"
    >
      <nuxt-img class="h-[20px] w-[20px]" src="/icons/yellow/donwload.svg" />
      <a
        class="hover:underline hover:underline-offset-1 hover:underline-yellow-400"
        :href="getUrl(detail.invoice)"
        donwload
      >
        Descargar recibo
      </a>
    </p>
  </div>
</template>

<script setup>
import moment from "moment";
import { computed, ref } from "vue";
import useUpload from "@/composables/useUpload";
const { getUrl } = useUpload();

const props = defineProps({
  detail: { type: Object, default: () => {} },
  list: { type: Boolean, default: false },
});
const emits = defineEmits(["back"]);
const pClass = "text-yellow-50 font-lg font-bold";
const spanClass = "text-yellow-400 font-normal";
const paymentTypes = {
  INCOME: "Cobro",
  OUTCOME: "Pago",
};
const type = computed(() => {
  if (!props?.detail) return "";

  return `${paymentTypes[
    props?.detail?.paymentType
  ]?.toUpperCase()} | Num recibo: ${props?.detail?.id}`;
});
function back() {
  emits("back");
}
</script>

<style lang="scss" scoped></style>
