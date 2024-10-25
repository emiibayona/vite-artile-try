<template>
  <UpperBarGeneric
    ref="upperBar"
    @action="searchRegistered"
    :loading="loading"
    :config="{
      input: { show: true, label: 'Datos' },
      button: { show: true, label: 'Buscar' },
      dropdown: {
        show: true,
        label: 'Institucion',
        options: centersList,
        forceCheck: true,
      },
    }"
    always-enabled
  >
    <PeopleList
      v-if="peopleFound?.rows?.length > 0"
      class="mt-10"
      :list="peopleFound?.rows"
      @select="selectUser"
    />
    <Paginate
      class="mt-5"
      :total="peopleFound?.count"
      :limit="limit"
      :page="page"
      @page-changed="fetchPeople"
    />
    <EmptyState :result="peopleFound?.rows" />
  </UpperBarGeneric>
</template>
<script setup>
import { useRouter } from "#app";

import PeopleList from "@/components/peoples/PeopleList.vue";
import UpperBarGeneric from "@/components/elements/UpperBarGeneric.vue";
import usePeoples from "@/composables/usePeoples";
import Paginate from "@/components/elements/Paginate";
import EmptyState from "~/components/elements/EmptyState.vue";
import useCenters from "@/composables/useCenters";

const { getPeoples } = usePeoples();
const { centersList } = useCenters();
const router = useRouter();

const loading = ref(false);
const peopleFound = ref(null);
const upperBar = ref(null);
const page = ref(1);
const limit = 5;
const actualParams = ref(null);

async function fetchPeople(params = {}) {
  peopleFound.value = await getPeoples({
    ...(actualParams.value || {}),
    ...params,
  });
}
async function searchRegistered({ search, dropdown }) {
  upperBar?.value?.setLoading(true);
  actualParams.value = { search, center: dropdown };
  await fetchPeople({ limit, offset: 0 });
  upperBar?.value?.setLoading(false);
}

function selectUser(user) {
  router.push(`/students/${user?.id}`);
}
</script>
