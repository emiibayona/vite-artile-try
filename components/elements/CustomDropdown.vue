<template>
  <div
    class="custom-dropdown flex flex-row justify-between"
    :class="[customClasses.wrapper]"
  >
    <div
      class="custom-dropdown_selector flex flex-row justify-between items-center h-[39px] w-full cursor-pointer rounded-lg"
      :class="[
        { 'bg-green-500': !vanilla && dropdownOpen },
        customClasses.selector,
      ]"
      @click="toggleDropdown"
    >
      <div>{{ value?.name || value?.description || placeholder }}</div>
      <nuxt-img src="icons/chevron-up.svg" :class="{ open: dropdownOpen }" />
    </div>
    <div
      class="custom-dropdown_options flex flex-col w-full shadow-md cursor-pointer"
      :class="[{ open: dropdownOpen }, { vanilla }, customClasses.options]"
      ref="target"
      v-on-click-outside="closeOnTrigger"
    >
      <div
        v-for="(option, index) in options"
        :key="option?.id"
        class="px-2.5 py-1 flex flex-row items-center justify-between hover:bg-green-500"
        :class="[{ value: option.id === value?.id }]"
        @click="selectOption(option)"
      >
        {{ option?.name || option?.description }}
        <nuxt-img
          v-if="option?.id === value?.id && !vanilla"
          src="icons/check.svg"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { vOnClickOutside } from "@vueuse/components";
import { ref, computed } from "vue";

const emits = defineEmits(["select"]);
const props = defineProps({
  options: { type: Array, required: true },
  value: { type: String, default: "" },
  placeholder: { type: String, default: "Elige opcion" },
  disabled: { type: Boolean, default: false },
  vanilla: { type: Boolean, default: false },
  maxWidth: { type: String, default: "full" },
});

const dropdownOpen = ref(false);

function closeOnTrigger() {
  if (dropdownOpen.value) {
    dropdownOpen.value = false;
  }
}
const customClasses = computed(() => ({
  wrapper: (props?.vanilla && "") || "",
  selector:
    (props?.vanilla &&
      "border-b-2 border-green-600 rounded-b-none bg-transparent") ||
    "bg-green-400 active:bg-green-500 px-2.5",
  options:
    (props?.vanilla && "h-fit bg-green-600") ||
    `rounded-lg bg-green-400 max-w-${props?.maxWidth}`,
}));

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}
function selectOption(option) {
  emits("select", option);
  toggleDropdown();
}
</script>
<style lang="scss">
.custom-dropdown {
  position: relative;
  &_selector {
    img {
      height: 11px;
      width: 15px;
      margin: 4px;
      transition: transform 0.2s ease-in;
      transform: rotate(180deg);
      &.open {
        transform: rotate(0deg);
      }
    }
  }
  &_options {
    position: absolute;
    z-index: 9;
    top: 42px;
    height: 0;
    overflow: auto;
    transition: height 0.2s ease-in-out;
    &.open {
      height: 148px;
      &.vanilla {
        height: fit-content;
      }
    }
    img {
      height: 15px;
      width: 15px;
    }
  }
}
</style>
