<template>
  <!-- wrapper -->
  <div v-if="!loading" class="form-people flex flex-col h-full px-20 mt-10">
    <!-- top -->
    <div
      v-if="create || edit"
      class="top flex flex-row justify-between w-full gap-28 h-fit bg-blue-500 border border-blue-200 px-20 py-12 rounded-lg relative"
    >
      <CustomButton
        class="absolute top-[-20px] right-10"
        :disabled="!saveButtonIsEnabled"
        type="save"
        @click="saveUser"
        ><template #icon
          ><nuxt-img
            v-if="saveButtonIsEnabled"
            class="w-[18px] h-[18px]"
            src="icons/yellow/check.svg" /></template
        >{{ "Guardar" }}</CustomButton
      >
      <!-- left -->
      <div class="flex flex-col w-250 items-star justify-start">
        <Photo
          class="h-[70px] w-[70px] sm:h-[185px] sm:w-[185px] z-0"
          rounded
          edit
          :source="data?.picture"
          @upload="addPreview"
        />
        <CustomTextArea
          :value="data.notes"
          class="mt-10"
          @input="(va) => (data.notes = va)"
        />
      </div>
      <!-- right -->
      <div
        id="form-people-personal-info"
        class="grid grid-cols-2 gap-x-10 w-[100%] h-fit gap-1"
      >
        <!-- Personales -->
        <div class="flex flex-col gap-1">
          <span
            class="text-yellow-300 underline underline-offset-[12px] underline-yellow-300 mb-10"
          >
            {{ "Datos personales" }}
          </span>
          <div :class="[inputsClasses]">
            <span>{{ "Nombre/s" }}</span
            ><CustomInput
              :value="data.names"
              @input="(va) => (data.names = va)"
            />
          </div>
          <div :class="[inputsClasses]">
            <span>{{ "Apellido/s" }}</span
            ><CustomInput
              :value="data.lastnames"
              @input="(va) => (data.lastnames = va)"
            />
          </div>
          <div :class="[inputsClasses]">
            <span>{{ "Documento" }}</span
            ><CustomInput :value="data.dni" @input="(va) => (data.dni = va)" />
          </div>
          <div :class="[inputsClasses]">
            <span>{{ "Edad" }}</span
            ><CustomInput
              type="number"
              :value="data.age"
              @input="(va) => (data.age = va)"
            />
          </div>
          <div :class="[inputsClasses]">
            <span>{{ "Genero" }}</span>
            <CustomDropdown
              :class="[size]"
              :value="data.gender"
              :options="genders"
              @select="(va) => (data.gender = va)"
            />
          </div>
          <!--  -->
          <div :class="[inputsClasses]">
            <span>{{ "Fecha de nacimiento" }}</span>
            <CustomDatepicker
              :class="[size]"
              :text="moment(data.birthdate)"
              :value="moment(data.birthdate)"
              :year-range="[1900, 2100]"
              @input="(va) => (data.birthdate = va)"
            />
          </div>
          <div :class="[inputsClasses]">
            <span>{{ "Email" }}</span
            ><CustomInput
              :value="data.email"
              @input="(va) => (data.email = va)"
            />
          </div>
          <div :class="[inputsClasses]">
            <span>{{ "Telefono" }}</span
            ><CustomInput
              :value="data.phone"
              @input="(va) => (data.phone = va)"
            />
          </div>
        </div>
        <!-- Direccion -->
        <div class="mt-16 relative">
          <span class="text-yellow-400 font-bold">DIRECCION</span>
          <div class="flex flex-col gap-1">
            <div :class="[inputsClasses, 'pl-5']">
              <span>{{ "Calle 1" }}</span
              ><CustomInput
                :value="data?.Address?.street_1"
                @input="(va) => (data.Address.street_1 = va)"
              />
            </div>
            <div :class="[inputsClasses, 'pl-5']">
              <span>{{ "Calle 2" }}</span
              ><CustomInput
                :value="data?.Address?.street_2"
                @input="(va) => (data.Address.street_2 = va)"
              />
            </div>
            <div :class="[inputsClasses, 'pl-5']">
              <span>{{ "Numero de puerta" }}</span
              ><CustomInput
                :value="data?.Address?.houseNumber"
                @input="(va) => (data.Address.houseNumber = va)"
              />
            </div>
            <div :class="[inputsClasses, 'pl-5']">
              <span>{{ "Ciudad" }}</span
              ><CustomInput
                :value="data?.Address?.city"
                @input="(va) => (data.Address.city = va)"
              />
            </div>
            <div :class="[inputsClasses, 'pl-5']">
              <span>{{ "Estado" }}</span
              ><CustomInput
                :value="data?.Address?.state"
                @input="(va) => (data.Address.state = va)"
              />
            </div>
            <div :class="[inputsClasses, 'pl-5']">
              <span>{{ "Pais" }}</span
              ><CustomInput
                :value="data?.Address?.country"
                @input="(va) => (data.Address.country = va)"
              />
            </div>
            <div
              class="flex flex-row-reverse items-end gap-2 absolute bottom-0 right-0 text-yellow-50"
            >
              <CustomCheckbox
                v-model="data.isEmployee"
                label="Es empleado?"
                class="ml-2"
                @update="(va) => (data.isEmployee = va)"
              />
              <div v-if="data.isEmployee" class="w-[200px] flex flex-col gap-1">
                <CustomDropdown
                  :value="data?.employeeCenter"
                  :options="centersList"
                  @select="(va) => (data.employeeCenter = va)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="relative">
      <DuesList ref="dueslist" :people-id="id" />
      <CustomButton
        class="absolute top-[-10px] right-10"
        type="edit"
        @click="openPlans"
        ><template #icon
          ><nuxt-img
            class="w-[18px] h-[18px]"
            src="icons/cross-add.png" /></template
        >{{ "Nuevo plan" }}</CustomButton
      >
    </div>
    <!-- bottom -->
    <div
      v-if="edit"
      class="flex flex-row gap-2 items-center text-yellow-150 font-extrabold pl-1 pt-1 cursor-pointer w-fit mt-2"
    >
      Planes actuales
      <nuxt-img
        :class="[
          'h-[15px] w-[15px] hover:cursor-pointer',
          { 'rotate-180': showPlans },
        ]"
        @click="showPlans = !showPlans"
        src="icons/chevron-up.svg"
      />
    </div>
    <div v-show="showPlans">
      <DuesList ref="dueslist" :people-id="id" @open-new="openPlans" />
    </div>
  </div>
  <div v-if="loading" class="mt-20 w-full flex flex-row justify-center">
    <Spinner />
  </div>
  <Modal
    v-model="showModal"
    @close="resetForm"
    :custom-style="'w-auto h-auto items-center'"
  >
    <div class="relative w-[1000px]">
      <CustomButton
        class="absolute top-[-10px] right-10 z-20"
        type="edit"
        @click="savePlans"
        :disabled="!saveButtonIsEnabled"
        ><template #icon
          ><nuxt-img
            class="w-[18px] h-[18px]"
            src="icons/yellow/pencil.svg" /></template
        >{{ "Guardar" }}</CustomButton
      >
      <div class="flex flex-col-reverse">
        <DuesForm
          class="mt-3"
          v-for="(df, index) in duesFormObjects"
          :data="df"
          :index="index"
          close-disabled
          @delete="deleteDuesFromForm"
          @initDate="initDueDate"
        />
      </div></div
  ></Modal>
</template>

<script setup>
import moment from "moment";
import { useRouter } from "#app";
import { onMounted } from "vue";
import CustomInput from "@/components/elements/CustomInput.vue";
import Photo from "@/components/Photo.vue";
import CustomTextArea from "@/components/elements/CustomTextArea.vue";
import Spinner from "../elements/Spinner.vue";
import CustomDatepicker from "@/components/elements/CustomDatepicker.vue";
import CustomDropdown from "@/components/elements/CustomDropdown.vue";
import CustomButton from "@/components/elements/CustomButton.vue";
import DuesForm from "@/components/elements/DuesForm.vue";
import useDues from "@/composables/useDues";
import usePeoples from "@/composables/usePeoples";
import useUpload from "@/composables/useUpload";
import usePayplan from "@/composables/usePayplan";
import { UploadsFolders, PEOPLE_TYPE } from "~/utils/constants";
import Modal from "@/components/elements/Modal.vue";
import DuesList from "@/components/DuesList.vue";
import CustomCheckbox from "../elements/CustomCheckbox.vue";
import useCenters from "@/composables/useCenters.js";

const inputsClasses =
  "h-[39px] grid grid-cols-[1fr_300px] w-full justify-between items-center gap-5 text-yellow-50";

const size = "w-auto-fit";
const props = defineProps({
  id: { type: String, default: null },
  create: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
  plans: { type: Boolean, default: false },
  people: { type: Object, default: () => {} },
});
const emits = defineEmits(["force"]);

const { dueIsFullfilled } = useDues();
const { createPeople, updatePeople } = usePeoples();
const { upload, getUrl } = useUpload();
const { createPayplan } = usePayplan();
const { centersList } = useCenters();

const router = useRouter();

const loading = ref(true);
const duesFormObjects = ref([]);
const dueslist = ref(null);
const showPlans = ref(false);
const showModal = ref(false);
const data = ref({
  dni: null,
  names: null,
  lastnames: null,
  email: null,
  phone: null,
  age: null,
  gender: null,
  birthdate: null,
  Address: {
    street_1: null,
    street_2: null,
    houseNumber: null,
    city: null,
    state: null,
    country: null,
  },
});
const genders = [
  { id: 1, name: "Masculino" },
  { id: 2, name: "Femenino" },
  { id: 3, name: "Otro" },
];

const saveButtonIsEnabled = computed(() => {
  const values = Object.values(data.value || {});
  const toCheck = [];
  if (props.create) {
    toCheck.push(values.every((x) => x));
    if (data.value.isEmployee) {
      toCheck.push(!!data.value.employeeCenter);
    }
  }
  if (props.edit) {
    toCheck.push(values.some((x) => x));
  }
  if (props.plans) {
    toCheck.push(duesFormObjects.value.length > 0);
  }
  if (duesFormObjects.value.length > 0) {
    toCheck.push(duesFormObjects.value.every((df) => dueIsFullfilled(df)));
  }

  return toCheck.every((x) => x);
});

function addDuesToForm() {
  showPlans.value = false;
  duesFormObjects.value = [
    ...duesFormObjects.value,
    {
      date: moment().toString(),
      dues: null,
      center: null,
      paymentMethod: null,
      amount: null,
      description: null,
    },
  ];
}

function deleteDuesFromForm(index) {
  duesFormObjects.value[index] = null;
  duesFormObjects.value = duesFormObjects.value.filter((df) => df !== null);
}

function getUserPayplans() {
  // Logic to create pay plans based on the selected dues and payment methods
  // This should be replaced with an API call to the backend
  //...
  const res = [];
  for (var i = 0; i < duesFormObjects.value.length; i++) {
    const plan = duesFormObjects.value[i];
    res.push({
      centerId: plan.center.id,
      startDate: plan.date,
      dues: +plan.dues,
      amount: +plan.amount,
      description: plan.description,
      paymentMethod: plan.paymentMethod.id,
    });
  }
  return res;
}

async function saveUser() {
  try {
    loading.value = true;
    let id = null;
    if (data?.value?.pictureToUpload) {
      await uploadPicture();
    } else {
      delete data?.value?.picture;
    }

    const studentParam = {
      ...data.value,
      address: data?.value?.Address,
      gender: data?.value?.gender?.name,
      centers: data.value.isEmployee
        ? [data.value.employeeCenter]
        : duesFormObjects.value.reduce((prev, curr) => {
            return [...prev, { id: curr?.center?.id }];
          }, []),
      payplans: getUserPayplans(),
      type: data.value.isEmployee ? PEOPLE_TYPE.EMPLOYEE : PEOPLE_TYPE.STUDENT,
    };
    if (props.create) {
      const res = await createPeople(studentParam);
      id = res?.id;
    } else {
      await updatePeople(studentParam);
    }
    emits("force");
    router.push(`/students/${id || props?.people?.id}/`);
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
}
function openPlans() {
  if (props.plans) {
    showModal.value = true;
    addDuesToForm();
  }
}
async function savePlans() {
  loading.value = true;
  const payplans = getUserPayplans();
  for (const payplan of payplans) {
    await createPayplan({ ...payplan, peopleId: props.people.id });
  }
  showModal.value = false;
  await resetForm();
}
function addPreview(va) {
  data.value.picture = URL.createObjectURL(va);
  data.value.pictureToUpload = va;
}
async function uploadPicture() {
  const form = new FormData();
  form.append("file", data?.value?.pictureToUpload);
  const params = {
    body: form,
    query: `folder=${UploadsFolders.PHOTOS}`,
  };
  const picture = await upload(params);
  data.value.picture = picture.filePath;
}
async function setTheData() {
  loading.value = true;
  if (props.people) {
    data.value = Object.assign({}, props.people);

    if (data.value?.picture) {
      data.value.picture = props?.plans
        ? data.value.picture
        : getUrl(data.value.picture);
    } else {
      data.value.picture = "/icons/dummy.svg";
    }

    if (data.value.birthdate) {
      document.getElementsByClassName("dp__pointer").value =
        data.value.birthdate;
    }

    if (data.value.gender) {
      data.value.gender = genders.find((g) => g.name === data.value.gender);
      if (props.plans) {
        data.value.gender = data?.value?.gender?.name;
      }
    }

    if (!data.value.Address) {
      data.value.Address = {
        street_1: null,
        street_2: null,
        houseNumber: null,
        city: null,
        state: null,
        country: null,
      };
    }
    if (data.value.type === PEOPLE_TYPE.EMPLOYEE) {
      data.value.isEmployee = true;
      data.value.employeeCenter = data.value.Centers[0];
    }

    await dueslist?.value?.loadPlans();
  }
  loading.value = false;
}
async function resetForm() {
  if (props.plans) {
    duesFormObjects.value = [];
    await dueslist?.value?.loadPlans(true);
  }
}

watch([() => props.people], () => setTheData());

onMounted(() => {
  setTheData();
});
</script>
