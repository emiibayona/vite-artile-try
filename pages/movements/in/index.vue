<template>
  <div>
    <UpperBarGeneric
      ref="upperBar"
      @action="searchMovements"
      :loading="loading"
      :config="{
        input: { show: true, label: 'Numero de recibo' },
        secondInput: { show: true, label: 'Documento o nombre de referencia' },
        date: { show: true, label: 'Fecha', avoidInit: true },
        secondDate: { show: true, label: 'Fecha', avoidInit: true },
        button: { show: true, label: 'Buscar' },
      }"
      always-enabled
    >
      <div class="mt-3" v-if="detail || movs?.count">
        <MovementDetail :detail="detail" list @back="detail = null" />
        <div
          v-show="!detail && movs"
          class="flex flex-col justify-between items-center w-full h-fit p-10 bg-blue-500 rounded-lg border border-blue-200 relative"
        >
          <MovementsList
            :movements="movs?.rows"
            @action="(val) => (detail = val)"
          />
          <Paginate
            class="mt-5"
            :total="movs?.count"
            :limit="limit"
            :page="page"
            @page-changed="fetchMovments"
          />
          <div
            class="absolute left-5 top-2 font-bold text-yellow-400 hover:cursor-pointer flex flex-row gap-2"
            @click="downloadExcel"
          >
            <nuxt-img
              class="h-[20px] w-[20px]"
              src="/icons/yellow/donwload.svg"
            />
            Descargar resultados
          </div>
        </div>
      </div>
      <EmptyState :result="movs?.rows" />
    </UpperBarGeneric>
  </div>
</template>

<script setup>
import * as XLSX from "xlsx";
import { computed } from "vue";
import UpperBarGeneric from "@/components/elements/UpperBarGeneric.vue";
import MovementsList from "@/components/MovementsList.vue";
import CustomDropdown from "@/components/elements/CustomDropdown.vue";
import MovementDetail from "@/components/elements/MovementDetail.vue";
import EmptyState from "@/components/elements/EmptyState.vue";
import Paginate from "@/components/elements/Paginate";
import usePayments from "@/composables/usePayments";

import moment from "moment";

const upperBar = ref(null);
const movs = ref(null);
const loading = ref(false);
const detail = ref(null);
const page = ref(1);
const limit = 5;
const actualParams = ref(null);
const { getMovements, PAYMENT_METHODS_ENUM, PAYMENT_TYPES } = usePayments();

const paymentTypes = {
  INCOME: "Cobro",
  OUTCOME: "Pago",
};

async function fetchMovments(params = {}, skipAssign = false) {
  if (params.page) {
    page.value = params.page;
  }
  const res = await getMovements({ ...(actualParams.value || {}), ...params });
  if (skipAssign) {
    return res;
  }
  movs.value = res;
}

async function searchMovements({ search, secondSearch, date, secondDate }) {
  detail.value = null;
  upperBar?.value?.setLoading(true);
  actualParams.value = {
    search,
    secondSearch,
    from: date,
    to: secondDate,
    type: PAYMENT_TYPES.value.INCOME,
    peopleRequired: true,
  };
  await fetchMovments({ limit, offset: 0 });
  upperBar?.value?.setLoading(false);
}

function parseToDownload(values) {
  return values.map((x) => {
    const people = {
      Persona: `${x?.People?.names} ${x?.People?.lastnames}`,
      "Persona: DNI": x?.People?.id,
      "Persona: EMAIL": x?.People?.email,
    };
    const entity = {
      Entidad: `${x?.Entity?.names} ${x?.Entity?.lastnames}`,
      "Entidad: DNI": x?.Entity?.id,
      "Entidad: EMAIL": x?.Entity?.email,
    };

    return {
      "Numero de recibo": x.id,
      Descripcion: x.description,
      "Tipo de movimiento": paymentTypes[x.paymentType],
      "Tipo de pago": PAYMENT_METHODS_ENUM[x.paymentMethod].name,
      Fecha: moment(x.createdAt).format("DD/MM/YYYY"),
      Valor: x.amount.toFixed(2),
      Centro: x?.Center?.name,
      ...(x.People ? people : {}),
      ...(x.Entity ? entity : {}),
    };
  });
}

async function downloadExcel() {
  if (!movs.value) return;

  // TODO: Improve the EXCEL's style

  const values = await fetchMovments({}, true);
  const toDonwload = parseToDownload(values?.rows || []);

  const worksheet = XLSX.utils.json_to_sheet(toDonwload);
  // 2. Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  // 3. Generate a binary Excel file (blob)
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // 4. Create a Blob from the buffer
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // 5. Create a link to download the file
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute(
    "download",
    `Resultados-${moment().format("DD/MM/YYYY_HH:mm")}.xlsx`
  ); // File name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style lang="scss" scoped></style>
