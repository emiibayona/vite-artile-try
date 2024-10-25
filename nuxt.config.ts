// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/image"],
  imports: { dirs: ["stores"] },
  css: ["~/src/index.css", "vue-final-modal/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  pinia: {
    storesDirs: ["~/stores/**"],
  },
});
