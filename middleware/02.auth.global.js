import { centersStore } from "@/stores/CentersStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // TODO: Implement some logic to load data.
  const app = useNuxtApp();
  const { getCenters } = centersStore(app.$pinia);
  await getCenters();
  // store.rehydrateUser().then((res) => {
  //   if (
  //     !store.getUser ||
  //     res?.data?.error /*error getting user*/ ||
  //     res?.status === 500 /*error with token*/
  //   ) {
  //     return navigateTo("/login");
  //   }
  //   if (to.fullPath.includes("login")) {
  //     const ok = to.fullPath.replace("login", "contacts");
  //     return navigateTo(ok);
  //   }
  //   return navigateTo(to.fullPath);
  // });
});
