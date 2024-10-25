<template>
  <div>
    <div
      v-if="show"
      class="flex flex-row flex-wrap justify-between gap-5 w-full h-fit px-20 py-10 bg-blue-500 rounded-lg border border-blue-200 p-1 relative"
    >
      <div class="flex flex-col">
        <div class="flex flex-col gap-2">
          <p :class="pClass">
            <span :class="spanClass">Institucion:</span>
            {{ data.Center.name }}
          </p>
          <p :class="pClass">
            <span :class="spanClass">Fecha de inscripcion:</span>
            {{ moment(data.date).format("DD/MM/YYYY") }}
          </p>
          <p :class="pClass">
            <span :class="spanClass">Cuotas:</span>
            {{ data.Dues.length }}
          </p>
          <p v-if="data.paymentMethod" :class="pClass">
            <span :class="spanClass">Modalidad de pago:</span>
            {{ data.paymentMethod }}
          </p>
          <p :class="pClass">
            <span :class="spanClass">Costo:</span>
            {{ data.amount }}
          </p>
        </div>
        <p :class="pClass + ' mt-5'">
          <span :class="spanClass + ' font-bold'">Description:</span>
          {{ data.description }}
        </p>
      </div>
    </div>
    <div
      v-else
      class="flex flex-row flex-wrap justify-between gap-5 w-full h-fit px-20 py-10 bg-blue-500 rounded-lg border border-blue-200 p-1 relative"
    >
      <span
        v-if="!closeDisabled"
        class="absolute top-2 right-3 text-yellow-400 cursor-pointer"
        @click="emits('delete', index)"
        >X</span
      >
      <div class="w-full flex flex-row gap-5">
        <div class="w-[200px] flex flex-col gap-1">
          <span class="text-yellow-50">Institucion</span
          ><CustomDropdown
            :value="data?.center"
            :options="centersList"
            @select="(va) => (data.center = va)"
          />
        </div>
        <div class="w-[200px] flex flex-col gap-1">
          <span class="text-yellow-50">Fecha de inscripcion</span>
          <CustomDatepicker
            ref="datepicker"
            :value="data?.date"
            @input="(va) => (data.date = va)"
          />
        </div>
      </div>
      <div class="w-full flex flex-row gap-5">
        <div class="w-[200px] flex flex-col gap-1">
          <span class="text-yellow-50">Costo</span
          ><CustomInput
            type="number"
            :value="data?.amount"
            @input="(va) => (data.amount = va)"
          />
        </div>
        <div class="w-[200px] flex flex-col gap-1">
          <span class="text-yellow-50">Cantidad de cuotas</span
          ><CustomInput
            type="number"
            :value="data?.dues"
            @input="(va) => (data.dues = va)"
          />
        </div>
        <div class="w-[200px] flex flex-col gap-1">
          <span class="text-yellow-50">Modalidad de pago</span
          ><CustomDropdown
            :value="data?.paymentMethod"
            :options="PAYMENT_METHODS"
            @select="(va) => (data.paymentMethod = va)"
          />
        </div>
      </div>
      <div class="w-full flex flex-row">
        <div class="w-full flex flex-col gap-1">
          <span class="text-yellow-50">Description</span>
          <CustomTextArea
            :value="data.description"
            @input="(va) => (data.description = va)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
import CustomDatepicker from "@/components/elements/CustomDatepicker.vue";
import CustomInput from "@/components/elements/CustomInput.vue";
import CustomDropdown from "@/components/elements/CustomDropdown.vue";
import usePayments from "@/composables/usePayments.js";
import useCenters from "@/composables/useCenters.js";
import CustomTextArea from "./CustomTextArea.vue";
const props = defineProps({
  data: { type: Object, default: () => ({}) },
  index: { type: Number, required: true },
  show: { type: Boolean, default: false },
  closeDisabled: { type: Boolean, default: false },
});
const emits = defineEmits(["delete", "initDate"]);
const { PAYMENT_METHODS } = usePayments();
const { centersList } = useCenters();
const datepicker = ref(null);
const pClass = "text-yellow-50 font-lg";
const spanClass = "text-yellow-400";
</script>
<style lang="scss"></style>
