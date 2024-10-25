<template>
  <button
    id="custom-button"
    :disabled="disabled"
    :class="customClasses"
    :style="customStyle"
  >
    <div class="flex flex-row justify-center items-center gap-2">
      <slot></slot>
      <input
        v-model="check"
        v-if="type === 'toggle'"
        class="toggle"
        type="checkbox"
      />
      <slot v-else name="icon"></slot>
    </div>
  </button>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  type: { type: String, default: () => "large" },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  fit: { type: Boolean, default: false },
  smallFit: { type: Boolean, default: false },
  customStyle: { type: Object, default: () => {} },

});

const check = ref(false);

const emits = defineEmits(["update-check"]);

watch(check, () => emits("update-check", check.value));

const customClasses = computed(() => {
  const classes = {
    dimensions: ["w-[148px]"],
    borders: [
      "rounded-l-md rounded-r-md hover:outline-2 hover:outline-yellow-50",
    ],
    colors: ["text-blue-150"],
    actions: ["custom-button ease-in duration-300"],
  };
  let res = [];
  if (props.block) {
    res.push("w-full");
  }
  if (props.fit) {
    classes.dimensions.push("w-min", "px-10");
  }
  if (props.disabled) {
    classes.actions.push("disabled");
    classes.colors.push("bg-blue-50");
    classes.colors.push("text-blue-200");
    classes.actions.push("hover:bg-blue-50", "hover:pointer-events-none");
  } else if (props.type === "save") {
    classes.colors.push("text-yellow-300 bg-green-500");
    classes.actions.push("hover:bg-green-600", "hover:pointer-events-auto");
  } else {
    classes.colors.push("bg-blue-300");
    classes.actions.push("hover:bg-blue-500", "hover:pointer-events-auto");
    if (props.type === "toggle") {
      classes.actions.push("transition-all duration-300 hover:cursor-default");
    }
  }
  if (props.smallFit) {
    classes.dimensions.push("h-small-fit", "w-min", "px-4");
  } else {
    classes.dimensions.push("h-[39px]");
  }
  Object.values(classes).forEach((x) => (res = [...res, ...x]));

  return res.join(" ");
});
</script>
<style lang="scss">
.custom-button {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  transition: 1ms ease-in-out;
  .toggle {
    appearance: none;
    position: relative;
    display: inline-block;
    box-sizing: content-box;
    width: 25px;
    height: 10px;
    padding: 0.2em;
    border: none;
    cursor: pointer;
    border-radius: 1.5em;
    overflow: hidden;
    background-color: #707070;
    transition: background ease 0.3s;
    border: 1px solid #fcf9ef;
  }
  &.disabled {
    .toggle {
      background-color: unset;
      border: 1px solid rgba(29, 27, 32, 0.12);
      pointer-events: none;
    }
  }
  .toggle:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 2;
    width:11px;
    height: 11px;
    font-family: system-ui;
    font-size: 1em;
    line-height: 2em;
    font-weight: 500;
    text-transform: uppercase;
    text-indent: -2em;
    word-spacing: 2.55em;
    text-shadow: -1px -1px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
    background: #fff;
    color: #fff;
    border-radius: 1.5em;
    transition: transform cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
  }

  .toggle:checked {
    background-color: #62ad65;
  }

  .toggle:checked:before {
    transform: translateX(14px);
  }
}
</style>
