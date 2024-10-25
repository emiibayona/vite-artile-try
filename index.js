import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/pages/index.vue";
import { createVfm } from "vue-final-modal";
import vClickOutside from "click-outside-vue3";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const app = createApp(App);

app.use(createPinia()).use(createVfm()).use(vClickOutside);
app.component("VueDatePicker", VueDatePicker);
app.mount("#app");
