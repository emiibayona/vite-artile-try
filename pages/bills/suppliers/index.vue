<template>
  <div>
    <div
      class="flex flex-col justify-between w-full h-fit mt-10 p-10 gap-10 bg-blue-500 rounded-lg border border-blue-200 relative"
    >
      <div class="grid grid-cols-5 gap-x-10 gap-y-12">
        <!-- Fecha -->
        <div class="w-[250px] flex flex-col gap-1">
          <span class="text-yellow-50">Fecha</span
          ><CustomDatepicker
            :value="data?.date"
            @input="(va) => (data.date = va)"
          />
        </div>
        <!-- Codigo asociada -->
        <div class="w-[250px] flex flex-col gap-1">
          <span class="text-yellow-50">Numero factura</span
          ><CustomInput :value="data?.code" @input="(va) => (data.code = va)" />
        </div>
        <!-- Centro -->
        <div class="w-[250px] flex flex-col gap-1">
          <span class="text-yellow-50">Institucion</span
          ><CustomDropdown
            :value="data?.center"
            :options="centersList"
            @select="selectCenter"
          />
        </div>
        <!-- Supplier asociada -->
        <div class="w-[250px] flex flex-col gap-1">
          <span class="text-yellow-50">Proveedor</span
          ><CustomInput
            :value="data?.supplier"
            @input="(va) => (data.supplier = va)"
          />
        </div>
        <!-- Monto -->
        <div class="w-[250px] flex flex-col gap-1">
          <span class="text-yellow-50">Monto</span
          ><CustomInput
            :value="data?.amount"
            @input="(va) => (data.amount = +va)"
            type="number"
          />
        </div>
      </div>
      <div class="w-full flex flex-col gap-1 mb-8">
        <span class="text-yellow-50">Description</span
        ><CustomTextArea
          :value="data?.description"
          @input="(va) => (data.description = va)"
        />
      </div>
      <div
        class="flex flex-row gap-2 text-yellow-400 font-bold hover:opacity-100"
      >
        <nuxt-img class="h-[20px] w-[20px]" src="/icons/yellow/upload.svg" />
        <span
          @click="triggerFileInput"
          :class="[
            { 'opacity-80': invoice },
            'cursor-pointer hover:opacity-100',
          ]"
        >
          Sube un comprobante
        </span>
        <nuxt-img
          v-if="invoice"
          class="h-[20px] w-[20px]"
          src="/icons/check-steps.svg"
        />
        <input
          type="file"
          ref="fileInput"
          accept="image/*, application/pdf"
          @change="handleFileChange"
          hidden
        />
      </div>
      <CustomButton
        class="absolute bottom-[-20px] right-10 mt-10 md:mt-0"
        :disabled="!saveEnabled"
        @click="save"
      >
        {{ "Guardar" }}
      </CustomButton>
    </div>
    <Modal
      v-model="showModal"
      @close="goToMovements"
      :custom-style="'w-[500px] h-[auto]'"
      ><MovementDetail class="w-[500px]" :detail="detail"
    /></Modal>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "#app";

import CustomDatepicker from "@/components/elements/CustomDatepicker.vue";
import CustomDropdown from "@/components/elements/CustomDropdown.vue";
import CustomTextArea from "@/components/elements/CustomTextArea.vue";
import CustomInput from "@/components/elements/CustomInput.vue";
import CustomButton from "@/components/elements/CustomButton.vue";
import Modal from "~/components/elements/Modal.vue";
import MovementDetail from "@/components/elements/MovementDetail.vue";

import useCenters from "@/composables/useCenters.js";
import usePayments from "@/composables/usePayments";
import { PEOPLE_TYPE, UploadsFolders } from "~/utils/constants";
import useUpload from "@/composables/useUpload";
import usePeoples from "@/composables/usePeoples";
import moment from "moment";

const router = useRouter();
const { upload } = useUpload();
const { centersList } = useCenters();
const { createPayment, PAYMENT_TYPES, PAYMENT_METHODS_ENUM } = usePayments();
const { getPeoples } = usePeoples();
const data = ref({
  amount: null,
  center: null,
  date: null,
  description: "",
  supplier: "",
  code: "",
});
const invoice = ref(null);
const fileInput = ref(null);
const peoplesList = ref(null);
const selectedPeople = ref(null);
const showModal = ref(null);
const saveEnabled = computed(() => Object.values(data.value).every((x) => x));
const detail = ref(null);

async function uploadInvoice() {
  if (invoice.value) {
    const form = new FormData();
    form.append("file", invoice.value);
    const params = {
      body: form,
      query: `folder=${UploadsFolders.INVOICES}`,
    };
    const response = await upload(params);
    data.value.invoice = response.filePath;
  }
}
async function save() {
  try {
    await uploadInvoice();
    const { amount, center, date, description, invoice, supplier, code } =
      data.value;
    const params = {
      amount,
      center,
      date,
      description,
      paymentMethod: PAYMENT_METHODS_ENUM.CASH.id,
      centerId: data?.value?.center?.id,
      paymentType: PAYMENT_TYPES.value.OUTCOME,
      invoice,
      supplier,
      code,
    };
    if (selectedPeople.value) {
      params.peopleId = selectedPeople.value.id;
    }
    const res = await createPayment(params);
    detail.value = {
      ...res.rows[0],
      People: peoplesList?.value?.find(
        (x) => x.id === selectedPeople?.value?.id
      ),
      Center: data?.value?.center,
    };
    showModal.value = true;
  } catch (error) {
    console.error(error);
  }
}
function triggerFileInput() {
  fileInput.value.click();
}
function handleFileChange(event) {
  const file = event.target.files[0];

  if (file) {
    invoice.value = file;
  }
}
async function selectCenter(va) {
  data.value.center = va;
  peoplesList.value =
    (
      await getPeoples({
        center: data.value.center.id,
        type: PEOPLE_TYPE.EMPLOYEE,
      })
    )?.rows || [];
}
function goToMovements() {
  return router.push("/movements/out");
}
onMounted(() => {
  data.value.date = moment().toDate();
});
</script>

<style lang="scss" scoped></style>
