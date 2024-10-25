<template>
  <div :class="['w-full h-full transition-all duration-300 ease-in-out']">
    <div
      v-if="!source"
      class="flex items-center justify-center rounded-full bg-blue-150 h-full w-full"
      :class="[{ shadow: edit }, { 'hover:cursor-pointer': edit }]"
      @click="triggerFileInput"
    >
      <nuxt-img src="icons/camera.svg" class="h-10 w-10"/>
    </div>
    <nuxt-img
      v-else
      :class="[
        'object-cover',
        { 'rounded-full': rounded },
        'w-full h-full',
        { 'sm:border-2 sm:border-black': border },
        { 'hover:cursor-pointer': edit },
      ]"
      :src="source"
      @click="triggerFileInput"
    />
    <input
      v-if="edit"
      type="file"
      ref="fileInput"
      accept="image/*"
      @change="handleFileChange"
      hidden
    />
  </div>
</template>
<script setup>
const props = defineProps({
  source: { type: String, default: null },
  dimension: { type: Number, default: 70 },
  rounded: { type: Boolean, default: true },
  border: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
});

const emit = defineEmits(["upload"]);
const fileInput = ref(null);
const preview = ref(null);
function triggerFileInput() {
  if (props?.edit) {
    fileInput.value.click();
  }
}
// Method to handle file selection and generate a preview
function handleFileChange(event) {
  const file = event.target.files[0];

  if (file) {
    preview.value = URL.createObjectURL(file);
    emit("upload", file);
  }
}
</script>
<style lang="scss">
.shadow {
  transition: box-shadow 300ms ease-in-out;
  &:hover {
    box-shadow: -4px 4px 10px 4px rgba(0, 0, 0, 0.2) inset;
    cursor: pointer;
  }
}
</style>
