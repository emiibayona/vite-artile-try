<template>
  <FormPeople
    v-if="editMode || createMode || planMode"
    :id="route?.params?.id"
    :edit="editMode"
    :create="createMode"
    :plans="planMode"
    :people="pp"
    @force="fetch"
  />
  <People v-else :people="pp" />
</template>
<script setup>
import FormPeople from "~/components/peoples/EditStudent.vue";
import People from "~/components/peoples/Student.vue";
import { useAsyncData, useRoute, useRouter } from "#app";
import usePeople from "@/composables/usePeoples";

const route = useRoute();
const createMode = computed(() => route?.query?.create);
const editMode = computed(() => route?.query?.edit);
const planMode = computed(() => route?.query?.plan);
const { getPeopleById } = usePeople();
const pp = ref(null);
async function fetch() {
  if (route?.params?.id) {
    pp.value = await getPeopleById(route?.params?.id);
  }
}
onMounted(async function () {
  await fetch();
});
</script>

<style lang="scss" scoped></style>
