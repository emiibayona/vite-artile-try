import { defineStore } from "pinia";
import { StoreStatus } from "#imports";
import service from "@/services/CentersService.js";
export const centersStore = defineStore("centers", {
  state: () => ({
    centers: { value: [], status: StoreStatus.SUCCESS },
  }),
  actions: {
    async getCenters() {
      this.centers.status = StoreStatus.LOADING;
      const res = await service.getCenters();
      this.centers.value = res?.rows;
      this.centers.status = StoreStatus.SUCCESS;
    },
  },
  getters: {
    getCentersList: (state) => state?.centers?.value,
    isCentersLoading: (state) => state?.centers?.status === StoreStatus.LOADING,
  },
});
