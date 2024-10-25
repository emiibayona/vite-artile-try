<template>
  <div
    class="relative w-full flex flex-row flex-nowrap content-center rounded-md bg-blue-300 text-blue-150"
    :class="[(small && 'h-[39px]') || 'h-[45px]']"
  >
    <nuxt-img
      class="absolute hover:cursor-pointer"
      :class="[
        (small && 'w-[13px] h-[13px] top-[12px] left-3') ||
          'top-3 left-3 w-[18px] h-[19px]',
      ]"
      src="icons/search.png"
      @click="emits('search')"
    />
    <input
      class="w-full pl-10 rounded-md focus:outline-none bg-blue-300 text-blue-150 search-bar"
      :class="[green && 'bg-green-400']"
      :value="value"
      type="text"
      placeholder=""
      @keyup.esc="cleanUp"
      @input="callInput($event)"
    />
    <nuxt-img
      v-if="value"
      class="absolute hover:cursor-pointer"
      :class="[
        (small && 'top-2 right-2 w-[25px] h-[25px]') ||
          'top-[25%] right-3 w-[25px] h-[25px]',
      ]"
      src="icons/red-cross.svg"
      @click="cleanUp"
    />
  </div>
</template>
<script setup>
import debounce from "debounce";
const props = defineProps({
  value: { type: [String, Number], default: "" },
  green: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  debounce: { type: Number, default: 0 },
});
const emits = defineEmits(["input", "search"]);
const callInput = debounce(($event) => {
  emits("input", $event.target.value);
}, props?.debounce);
const cleanUp = () => {
  emits("input", "");
};
</script>

<style lang="scss">
.search-bar {
  &::placeholder {
    color: rgba(201, 219, 225, 1) !important;
  }
  &:focus {
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset;
  }
}
</style>
