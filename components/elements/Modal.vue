<template>
  <VueFinalModal
    class="flex flex-row justify-center items-center"
    :content-class="contentClass"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    @click-outside="emit('close')"
    @closed="emit('close')"
  >
    <h1 v-if="title" class="mb-4">{{ title }}</h1>
    <slot />
    <CustomButton v-if="button" class="mt-4" @click="emit('confirm')" fit>{{
      button?.label
    }}</CustomButton>
  </VueFinalModal>
</template>
<script setup>
import { computed } from "vue";
import { VueFinalModal } from "vue-final-modal";
import CustomButton from "./CustomButton.vue";

const emit = defineEmits(["confirm"]);
const props = defineProps({
  title: { type: String, default: null },
  button: { type: Object, default: null },
  customStyle: { type: String, default: null },
});
const contentClass = computed(() => {
  let base = "rounded-2xl p-10 flex flex-col flex-wrap items-end";

  if (props?.customStyle) {
    base = `${base} ${props?.customStyle}`;
  } else {
    base += " w-auto h-[auto]";
  }
  return base;
});
</script>
