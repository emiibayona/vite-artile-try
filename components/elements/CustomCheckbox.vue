<template>
  <div class="flex flex-row gap-1">
    <div class="flex items-center">
      <input
        v-if="edit"
        type="checkbox"
        :checked="value"
        :class="checkboxStyle"
        @change="$emit('update', $event.target.checked)"
      />
      <span
        v-if="!edit"
        class="text-grey"
        :class="{ 'italic text-[12px]': !value && emptyValue }"
      >
        {{ value ? "Checked" : emptyValue || "Unchecked" }}
      </span>
    </div>
    <label v-if="label" class="text-yellow-50">{{ label }}</label>
    <span class="text-red-error">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
defineEmits(["update"]);

const props = defineProps({
  value: { type: Boolean, default: false },
  label: { type: String, default: "" },
  emptyValue: { type: String, default: null },
  error: { type: String, default: null },
  edit: { type: Boolean, default: true },
});

const checkboxStyle = computed(() => {
  const base = [
    "custom-checkbox w-4 h-4 text-blue-600 bg-yellow-100 border-yellow-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
  ];
  if (props.error) {
    base.push("border-red-error");
  }
  return base.join(" ");
});
</script>

<style scoped lang="scss">
.custom-checkbox {
  &:focus {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  }
  &:checked {
    background-color: rgba(0, 150, 0, 1);
  }
}
.text-red-error {
  color: #f00;
}
.text-grey {
  color: #ccc;
}
</style>
