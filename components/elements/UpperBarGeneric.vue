<template>
  <div class="mt-10 flex flex-col justify-center items-center">
    <div class="w-[300px] sm:w-[600px] md:w-[850px] lg:w-full xl:w-full">
      <div
        class="relative w-full flex flex-col md:flex-row justify-star items-center md:items-end sm:gap-20 bg-blue-500 border border-blue-200 rounded-lg p-10 text-yellow-50"
      >
        <div
          v-if="config?.dropdown?.show"
          class="flex flex-col gap-2 justify-end w-full md:w-[300px]"
        >
          {{ config?.dropdown?.label || "Elige" }}

          <CustomDropdown
            :value="dropdown"
            :options="config?.dropdown?.options"
            @select="selectDropdown"
          />
        </div>
        <div
          v-if="config?.input?.show"
          class="flex flex-col gap-2 justify-end w-full md:w-[300px]"
        >
          {{ config?.input?.label || "Datos" }}
          <SearchBarSq
            green
            small
            :value="searchValue"
            @input="(va) => (searchValue = va)"
          />
        </div>
        <div
          v-if="config?.secondInput?.show"
          class="flex flex-col gap-2 justify-end w-full md:w-[300px]"
        >
          {{ config?.secondInput?.label || "Datos" }}
          <SearchBarSq
            green
            small
            :value="secondSearchValue"
            @input="(va) => (secondSearchValue = va)"
          />
        </div>
        <div
          v-if="config?.date?.show"
          class="flex flex-col gap-2 justify-end w-full md:w-auto"
        >
          {{ config?.date?.label || "Fecha de registro" }}
          <CustomDatepicker
            :text="date"
            :value="date"
            :partial-range="true"
            :avoid-init="config?.date?.avoidInit"
            small
            @input="(va) => (date = moment(va).startOf('day').toDate())"
          />
        </div>
        <div
          v-if="config?.secondDate?.show"
          class="flex flex-col gap-2 justify-end w-full md:w-auto"
        >
          {{ config?.secondDate?.label || "Fecha de registro" }}
          <CustomDatepicker
            :text="secondDate"
            :value="secondDate"
            :partial-range="true"
            :avoid-init="config?.secondDate?.avoidInit"
            small
            @input="(va) => (secondDate = moment(va).endOf('day').toDate())"
          />
        </div>
        <CustomButton
          v-if="config?.button?.show"
          class="absolute top-[-20px] right-10 mt-10 md:mt-0"
          :disabled="!searchEnabled"
          @click="search"
        >
          {{ config?.button?.label }}
        </CustomButton>
      </div>
    </div>
    <div class="w-[300px] sm:w-[600px] md:w-[850px] lg:w-full xl:w-full">
      <div v-if="loading" class="mt-20 w-full flex flex-row justify-center">
        <Spinner />
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
import SearchBarSq from "@/components/elements/SearchBarSq.vue";
import CustomDatepicker from "@/components/elements/CustomDatepicker.vue";
import CustomButton from "@/components/elements/CustomButton.vue";

import Spinner from "@/components/elements/Spinner.vue";
import CustomDropdown from "./CustomDropdown.vue";

const emits = defineEmits(["action"]);
const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      input: { show: true, label: "", values: null },
      secondInput: { show: true, label: "", values: null },
      date: { show: true, label: "", values: null },
      secondDate: { show: true, label: "", values: null },
      dropdown: { show: true, label: "", values: null },
      button: { show: true, label: "Buscar", values: null },
    }),
  },
  alwaysEnabled: { type: Boolean, default: false },
});
const loading = ref(false);
const searchValue = ref("");
const secondSearchValue = ref("");
const date = ref(null);
const secondDate = ref(null);
const dropdown = ref(null);
const searchEnabled = computed(() => {
  const value =
    searchValue.value.length > 0 ||
    secondSearchValue.value.length > 0 ||
    date?.value ||
    secondDate?.value ||
    dropdown?.value;

  if (props?.config?.dropdown?.forceCheck) {
    return value;
  } else {
    return value || props?.alwaysEnabled;
  }
});

function search() {
  // Fetch people data based on searchValue and date and update peopleFoun

  if (!date?.value && !props?.config?.date?.avoidInit) {
    date.value = new Date();
  }
  if (!secondDate?.value && !props?.config?.secondDate?.avoidInit) {
    secondDate.value = new Date();
  }

  const searchDate = moment(date.value).startOf("day");
  const searchSecondDate = moment(secondDate.value).endOf("day");

  emits("action", {
    search: searchValue.value,
    secondSearch: secondSearchValue.value,
    date: searchDate?.isValid() ? searchDate : "",
    secondDate: searchSecondDate?.isValid() ? searchSecondDate : "",
    dropdown: dropdown?.value?.id || dropdown.value,
  });
}

function selectDropdown(value) {
  dropdown.value = value;
}
function setLoading(val) {
  loading.value = val;
}
function getValues() {
  return {
    input: searchValue.value,
    date: date.value,
  };
}
function reset() {
  searchValue.value = "";
  secondSearchValue.value = "";
  date.value = null;
  secondDate.value = null;
}

defineExpose({ setLoading, getValues, reset });
</script>
<style lang="scss"></style>
