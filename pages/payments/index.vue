div
<template>
  <div>
    <UpperBarGeneric
      ref="upperBar"
      @action="search"
      :loading="loading"
      :config="{
        input: { show: true, label: 'Documento o nombre de referencia' },
        date: { show: true, label: 'Fecha', avoidInit: true },
        button: { show: true, label: 'Buscar' },
      }"
    >
      <PeopleList
        v-if="peopleFound?.rows?.length && !data"
        class="mt-10"
        :list="peopleFound?.rows"
        @select="selectUser"
      />
      <Paginate
        v-if="!data"
        class="mt-5"
        :total="peopleFound?.count"
        :limit="limit"
        :page="page"
        @page-changed="fetchPeople"
      />
      <EmptyState :result="peopleFound?.rows" />
      <div
        v-if="data"
        class="mt-6 flex flex-col justify-between w-full h-fit p-10 pt-5 gap-5 bg-blue-500 rounded-lg border border-blue-200 relative"
      >
        <div>
          <span class="text-yellow-300 font-bold text-xl">{{
            `${data.names} ${data.lastnames}`
          }}</span>
          <div class="grid grid-cols-3 gap-x-20 w-full">
            <div
              v-for="(val, index) in wizzard"
              class="w-full text-ellipsis"
              :class="{ 'text-yellow-300': wizzardSelected.step > val.step }"
              :key="`st-${index}`"
            >
              <div
                class="cursor-pointer flex flex-row items-center justify-between"
                @click="
                  wizzardSelected = wizzard.find((x) => x.step === index + 1)
                "
              >
                Paso {{ val.step }}
                <span class="text-ellipsis flex flex-row gap-1"
                  ><nuxt-img
                    class="h-[20px]"
                    :src="`/icons/${
                      wizzardSelected.step > val.step ? 'check-steps' : 'next'
                    }.svg`" />
                  <nuxt-img
                    v-if="wizzardSelected.step < val.step"
                    class="h-[20px]"
                    :src="`/icons/${
                      wizzardSelected.step >= val.step ? 'check-steps' : 'next'
                    }.svg`"
                /></span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div v-if="wizzardSelected.step === 1">
            <div class="w-[200px] flex flex-col gap-1">
              <span class="text-yellow-50">Centro</span
              ><CustomDropdown
                :value="selecteds.center"
                :options="data?.Centers || []"
                @select="selectCenter"
              />
            </div>
          </div>
          <div v-if="wizzardSelected.step === 2">
            <div
              v-if="data?.payplans?.length"
              class="w-full bg-blue-600 p-5 border border-yellow-300 rounded-lg text-yellow-300"
            >
              <div class="px-1 w-full grid grid-cols-people-list mb-5">
                <span>Fecha de inicio</span>
                <span>Description</span>
                <span>Costo total</span>
                <span>Cuotas</span>
                <span></span>
              </div>
              <div
                class="w-full flex flex-col divide-y divide-yellow-300 border-t border-yellow-300 text-yellow-50"
              >
                <div
                  class="w-full grid grid-cols-people-list px-1 py-2 hover:bg-green-400"
                  v-for="(val, index) in data?.payplans"
                  :key="index"
                >
                  <span>{{ moment(val?.startDate).format("DD/MM/YYYY") }}</span>
                  <span>{{ val.description }}</span>
                  <span>{{ val.amount }}</span>
                  <span>{{
                    `${val.Dues.reduce((prev, curr) => {
                      if (curr.status === "PAID") {
                        prev += 1;
                      }
                      return prev;
                    }, 0)}/${val.dues}`
                  }}</span>
                  <span
                    class="hover:font-extrabold cursor-pointer"
                    @click="selectPlan(val)"
                  >
                    >>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="wizzardSelected.step === 3">
            <div class="grid grid-cols-3 gap-x-20 gap-y-12">
              <div class="w-[200px] flex flex-col gap-1">
                <span class="text-yellow-50">Cantidad de cuotas</span
                ><CustomDropdown
                  :value="selecteds.due"
                  :options="duesPending"
                  @select="selectDue"
                />
              </div>
              <!-- Elegir curso -->
              <div>
                <!-- cuotas a cancelar -->
                <div class="w-[200px] flex flex-col gap-1">
                  <span class="text-yellow-50">Modalidad de pago</span
                  ><CustomDropdown
                    :value="selecteds.payment"
                    :options="PAYMENT_METHODS"
                    @select="(va) => (selecteds.payment = va)"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-row-reverse justify-between mt-10">
              <!-- confirmación de pago -->
              <CustomCheckbox
                :value="selecteds.confirmPayment"
                label="Confirmar pago"
                @update="(va) => (selecteds.confirmPayment = va)"
              />
              <p v-if="selecteds?.due" class="text-yellow-500">
                Resumen de pago:
                <span class="text-yellow-50">{{ paymentDescription }}</span>
              </p>
            </div>
          </div>
        </div>
        <CustomButton
          class="absolute bottom-[-20px] right-10 mt-10 md:mt-0"
          :disabled="!saveEnabled"
          @click="save"
        >
          {{ "Guardar" }}
        </CustomButton>
      </div>
    </UpperBarGeneric>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import moment from "moment";
import { useRouter } from "#app";
import UpperBarGeneric from "@/components/elements/UpperBarGeneric.vue";
import CustomDropdown from "@/components/elements/CustomDropdown.vue";
import CustomButton from "@/components/elements/CustomButton.vue";
import CustomCheckbox from "@/components/elements/CustomCheckbox";
import Paginate from "@/components/elements/Paginate";
import EmptyState from "~/components/elements/EmptyState.vue";

import usePeoples from "@/composables/usePeoples";
import PeopleList from "@/components/peoples/PeopleList.vue";
import usePayplan from "@/composables/usePayplan";

const { getPeoples } = usePeoples();
const { getPayplansByUser } = usePayplan();
const { PAYMENT_METHODS, PAYMENT_TYPES, createPayment } = usePayments();
const router = useRouter();

const page = ref(1);
const limit = 5;
const actualParams = ref(null);

const loading = ref(false);
const peopleFound = ref(null);
const upperBar = ref(null);
const data = ref(null);
const wizzard = ref([
  { step: 1, name: "" },
  { step: 2, name: "" },
  { step: 3, name: "" },
]);
const wizzardSelected = ref(wizzard.value[0]);
const selecteds = ref({
  center: null,
  plan: null,
  due: null,
  payment: null,
  confirmPayment: false,
});

const duesToCancel = computed(() => {
  const dues = [];
  for (let index = 0; index < selecteds.value.due.amount; index++) {
    dues.push({
      id: duesPending.value[index]?.value?.id,
      amount: duesPending.value[index]?.value?.amount,
    });
  }
  return dues;
});
const paymentDescription = computed(
  () =>
    `Cuotas a cancelar ${
      selecteds?.value?.due?.amount
    }. Monto: ${duesToCancel.value
      .reduce((prev, cur) => {
        return (prev += cur.amount);
      }, 0)
      .toFixed(2)}.${
      selecteds?.value?.payment
        ? " Metodo de pago: " + selecteds?.value?.payment?.name + "."
        : ""
    }`
);
const saveEnabled = computed(() =>
  Object.values(selecteds.value).every((x) => !!x)
);
async function save() {
  if (!selecteds.value) return;

  const { center, plan, payment } = selecteds.value;
  const params = {
    paymentType: PAYMENT_TYPES.value.INCOME,
    paymentMethod: payment.id,
    centerId: center.id,
    peopleId: plan.peopleId,
    entityId: plan.entityId,
    duesId: duesToCancel.value.map((x) => x.id),
    amount: duesToCancel.value.reduce((prev, cur) => {
      return (prev += cur.amount);
    }, 0),
    description: "Resumen de pago: " + paymentDescription.value,
  };

  await createPayment(params);
  resetForm();
  upperBar?.value?.reset();
}

const duesPending = computed(() => {
  if (!selecteds.value.center) return [];
  const payplanFromCenter = data.value?.payplans?.find(
    (x) => x?.Center?.id === selecteds.value.center.id
  );
  if (!payplanFromCenter) return [];

  const dues = payplanFromCenter?.Dues?.filter((p) => p.status === "PENDING");
  return dues.map((x, index) => ({
    id: `d${index}`,
    name: index + 1,
    value: x,
    amount: index + 1,
  }));
});

async function fetchPeople(params = {}) {
  peopleFound.value = await getPeoples({
    ...(actualParams.value || {}),
    ...params,
  });
}
async function search({ search, date }) {
  upperBar?.value?.setLoading(true);
  resetForm();
  actualParams.value = { search, date };
  await fetchPeople({ limit, offset: 0 });
  upperBar?.value?.setLoading(false);
}

async function selectUser(user) {
  data.value = user;
  await getPendingPayplans(user.id);
}
async function selectCenter(center) {
  selecteds.value.center = center;
  wizzardSelected.value = wizzard.value.find((x) => x.step === 2);
}
async function selectPlan(plan) {
  selecteds.value.plan = plan;
  wizzardSelected.value = wizzard.value.find((x) => x.step === 3);
}
async function selectDue(due) {
  selecteds.value.due = due;
}
async function getPendingPayplans(id) {
  data.value.payplans = (await getPayplansByUser(id))?.rows || [];
}
function resetForm() {
  peopleFound.value = null;
  selecteds.value = {
    center: null,
    plan: null,
    due: null,
    payment: null,
    confirmPayment: false,
  };
  data.value = null;
  wizzardSelected.value = wizzard.value[0];
}
</script>

<style lang="scss" scoped></style>
