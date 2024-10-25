<template>
  <VueDatePicker
    v-model="date"
    v-bind="$props"
    :class="{ small }"
    :format="format"
    :preview-format="format"
    :year-range="[2022, 2100]"
    :enable-time-picker="false"
    six-weeks="fair"
    auto-apply
    @update:model-value="handleDate"
  />
</template>
<script setup>
import { ref } from "vue";
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
import { onMounted } from "vue";
const emits = defineEmits(["input"]);
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
function handleDate(va) {
  emits("input", va);
}
const props = defineProps({
  small: { type: Boolean, default: false },
  value: { type: [Date, String, Object], default: null },
  avoidInit: { type: Boolean, default: false },
});
defineExpose({ handleDate });
const date = ref(props?.avoidInit ? props?.value : props?.value || new Date());
</script>

<style lang="scss">
.dp__theme_light {
  --dp-background-color: rgba(124, 170, 159, 1);
  --dp-border: unset;
  --dp-menu-border-color: rgba(252, 249, 239, 1);
  --dp-primary-color: rgba(51, 82, 92, 1);
  --dp-border-radius: 8px;

  .dp__disabled {
    --dp-background-color: rgba(201, 219, 225, 1);
  }

  .dp__input {
    height: 39px;
    border: unset;

    &.dp__disabled {
      background-color: rgba(201, 219, 225, 1);

      .dp__input_icon {
        color: rgba(166, 196, 205, 1) !important;
      }
    }
  }
  .dp__input_icon {
    color: rgba(51, 82, 92, 1) !important;
  }
  &.small {
    .dp__input {
      height: 39px;
    }
  }
}
</style>
