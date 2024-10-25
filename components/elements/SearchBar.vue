<template>
  <div
    class="relative w-full h-[45px] flex flex-row flex-nowrap content-center rounded-full bg-blue-300 text-blue-150"
  >
    <nuxt-img
      class="absolute top-3 left-3 w-[18px] h-[19px] hover:cursor-pointer"
      src="icons/search.png"
      @click="emits('search')"
    />
    <input
      class="w-full pl-10 rounded-full focus:outline-none bg-blue-300 text-blue-150 search-bar"
      :class="[green && 'bg-green-500']"
      :value="value"
      type="text"
      placeholder="Buscar"
      @keyup.esc="cleanUp"
      @input="callInput($event)"
    />
  </div>
</template>
<script setup>
import debounce from "debounce";
const { value } = defineProps({
  value: { type: [String, Number], default: "" },
  green: { type: Boolean, default: false },
});
const emits = defineEmits(["input", "search"]);
const callInput = debounce(($event) => {
  emits("input", $event.target.value);
}, 1000);
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
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  }
}
</style>
