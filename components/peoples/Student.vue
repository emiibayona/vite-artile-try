<template>
  <div
    class="form-people flex flex-col h-full w-full"
    :class="[{ 'mt-0 px-0': plan }, { 'mt-10 px-20': !plan }]"
  >
    <!-- top -->
    <div
      v-if="people"
      class="top flex flex-row justify-between w-full gap-28 h-auto bg-blue-500 border border-blue-200 px-20 py-12 rounded-lg relative"
    >
      <div class="flex flex-row-reverse gap-4 absolute top-[-20px] right-10">
        <CustomButton v-if="!plan" type="edit" @click="goTo('edit')"
          ><template #icon
            ><nuxt-img
              class="w-[18px] h-[18px]"
              src="icons/yellow/pencil.svg" /></template
          >{{ "Editar" }}</CustomButton
        >
        <CustomButton v-if="!plan" type="edit" @click="goTo('plan')"
          ><template #icon
            ><nuxt-img
              class="w-[18px] h-[18px]"
              src="icons/yellow/pencil.svg" /></template
          >{{ "Agregar planes" }}</CustomButton
        >
      </div>
      <!-- left -->
      <div v-if="people" class="flex flex-col w-250 items-center justify-start">
        <Photo
          v-if="profilePicture"
          class="h-[70px] w-[70px] sm:h-[185px] sm:w-[185px] z-0"
          rounded
          :source="profilePicture"
        />
        <span class="mt-5 text-yellow-300 text-xl">{{
          `${people?.names} ${people?.lastnames}`
        }}</span>
      </div>
      <!-- right -->
      <div
        id="form-people-personal-info"
        class="grid grid-cols-2 gap-x-10 w-[100%] h-fit gap-1"
      >
        <div class="flex flex-col gap-1">
          <span
            class="text-yellow-300 underline underline-offset-[12px] underline-yellow-300 mb-10"
          >
            {{ "Datos personales" }}
          </span>
          <div class="flex flex-col gap-2">
            <p :class="pClass">
              {{ "Nombres:" }}
              <span :class="spanClass">{{ people?.names }}</span>
            </p>
            <p :class="pClass">
              {{ "Apellidos:" }}
              <span :class="spanClass">{{ people?.lastnames }}</span>
            </p>
            <p :class="pClass">
              {{ "Cédula de identidad:" }}
              <span :class="spanClass">{{ people?.dni }}</span>
            </p>
            <p :class="pClass">
              {{ "Edad:" }}
              <span :class="spanClass">{{ people?.age }}</span>
            </p>
            <p :class="pClass">
              {{ "Fecha de nacimiento:" }}
              <span :class="spanClass">{{ people?.birthdate }}</span>
            </p>
            <p :class="pClass">
              {{ "Genero:" }}
              <span :class="spanClass">{{ people?.gender }}</span>
            </p>
            <p :class="pClass">
              {{ "Correo electrónico:" }}
              <span :class="spanClass">{{ people?.email }}</span>
            </p>
            <p :class="pClass">
              {{ "Teléfono:" }}
              <span :class="spanClass">{{ people?.phone }}</span>
            </p>
          </div>
        </div>
        <div :class="pClass" class="mt-16">
          <div class="flex flex-row gap-2 items-center">
            <p :class="pClass" class="font-bold">{{ "Dirección" }}</p>
          </div>
          <div class="flex flex-col gap-1 ml-2 mt-2">
            <p :class="pClass">
              {{ "Calle 1:" }}
              <span :class="spanClass">{{ people?.Address?.street_1 }}</span>
            </p>
            <p :class="pClass">
              {{ "Calle 2:" }}
              <span :class="spanClass">{{ people?.Address?.street_2 }}</span>
            </p>
            <p v-if="people?.Address?.houseNumber" :class="pClass">
              {{ "Numero de casa:" }}
              <span :class="spanClass">{{ people?.Address?.houseNumber }}</span>
            </p>
            <p :class="pClass">
              {{ "Ciudad:" }}
              <span :class="spanClass">{{ people?.Address?.city }}</span>
            </p>
            <p :class="pClass">
              {{ "Estado:" }}
              <span :class="spanClass">{{ people?.Address?.state }}</span>
            </p>
            <p :class="pClass">
              {{ "País:" }}
              <span :class="spanClass">{{ people?.Address?.country }}</span>
            </p>
            <p v-if="people?.Address?.postalCode" :class="pClass">
              {{ "Código postal:" }}
              <span :class="spanClass">{{ people?.Address?.postalCode }}</span>
            </p>
          </div>
          <!-- <span :class="spanClass">{{ people?.address }}</span> -->
        </div>
      </div>
    </div>
    <div v-else class="w-[300px] sm:w-[600px] md:w-[850px] lg:w-full xl:w-full">
      <div class="mt-20 w-full flex flex-row justify-center">
        <Spinner />
      </div>
    </div>
    <!-- bottom -->
    <DuesList :people-id="people?.id" />
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "#app";
import Spinner from "@/components/elements/Spinner.vue";
import Photo from "@/components/Photo.vue";
import CustomButton from "@/components/elements/CustomButton.vue";
import useUpload from "@/composables/useUpload";
import DuesList from "@/components/DuesList.vue";

const props = defineProps({
  people: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  plan: { type: Boolean, default: false },
});

const profilePicture = ref(null);
const router = useRouter();
const { getUrl } = useUpload();
const pClass = "text-yellow-50 font-lg";
const spanClass = "text-yellow-400";

function goTo(route) {
  router.push(`/students/${props?.people?.id}/?${route}=true`);
}
function setImage() {
  if (
    !props?.people?.picture ||
    props?.people?.picture === "/icons/dummy.svg"
  ) {
    profilePicture.value = "/icons/dummy.svg";
    return;
  }
  const blob = getUrl(props?.people?.picture);
  profilePicture.value = blob;
}
onMounted(() => setImage());
watch([() => props?.people?.picture], () => {
  setImage();
});
</script>
