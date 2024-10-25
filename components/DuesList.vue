<template>
  <div class="w-full h-auto grid grid-cols-2 gap-5">
    <DuesForm
      class="mt-3"
      v-for="(dts, index) in duesToShow"
      show
      :data="dts"
      :key="index"
    />
  </div>
</template>

<script setup>
import { watch, computed, ref, onMounted } from "vue";
import usePayplan from "@/composables/usePayplan";
import DuesForm from "@/components/elements/DuesForm.vue";

const props = defineProps({ peopleId: { type: String, default: null } });
const emits = defineEmits(["open-new"]);
const { getPayplansByUser } = usePayplan();

const loading = ref(true);
const duesToShow = ref([]);
onMounted(async () => {
  await loadPlans();
  if (duesToShow.value.length === 0) {
    emits("open-new");
  }
});
watch([() => props.peopleId], async () => {
  await loadPlans();
});
async function loadPlans(updateLoading = false) {
  loading.value = true;
  const pp = (await getPayplansByUser(props?.peopleId))?.rows || [];
  duesToShow.value = pp;

  if (updateLoading) {
    loading.value = false;
  }
}

defineExpose({ loadPlans });
</script>

<style lang="scss" scoped></style>
