import service from "@/services/PayplansService";
import { defineStore } from "pinia";
import { StoreStatus } from "#imports";

export const payplansStore = defineStore("payplans", {
  state: () => ({
    payplans: { value: null, status: StoreStatus.LOADING },
    viewPayplan: { value: null, status: StoreStatus.LOADING },
    newPayplan: { value: null, status: StoreStatus.SUCCESS },
  }),
  actions: {
    async getPayplans(query) {
      this.payplans.status = StoreStatus.LOADING;
      const res = await service.list(query);
      this.payplans.value = pageProcess(res);
      this.payplans.status = StoreStatus.SUCCESS;
    },
    async getPayplanById(id) {
      this.viewPayplan.status = StoreStatus.LOADING;
      const res = await service.getById(id);
      this.viewPayplan.value = res;
      this.viewPayplan.status = StoreStatus.SUCCESS;
      return res;
    },
    async getPayplansByUser(userId) {
      this.viewPayplan.status = StoreStatus.LOADING;
      const res = await service.getByUserId(userId);
      this.viewPayplan.value = res;
      this.viewPayplan.status = StoreStatus.SUCCESS;
      return res;
    },
    async createPayplan(params) {
      this.newPayplan.status = StoreStatus.LOADING;
      const res = await service.create(params);
      this.newPayplan.value = res;
      this.newPayplan.status = StoreStatus.SUCCESS;
      return res;
    },
    async updatePayplan(id, params) {
      this.viewPayplan.status = StoreStatus.LOADING;
      const res = await service.update(id, params);
      this.viewPayplan.value = res;
      this.viewPayplan.status = StoreStatus.SUCCESS;
      return res;
    },
    async deletePayplan(id) {
      this.viewPayplan.status = StoreStatus.LOADING;
      await service.delete(id);
      this.viewPayplan.status = StoreStatus.SUCCESS;
    },
  },
  getters: {
    payplansList: (state) => state?.payplans?.value,
    getViewPayplan: (state) => state?.viewPayplan?.value,
    isPayplansLoading: (state) =>
      state?.payplans?.status === StoreStatus.LOADING,
    isPayplanLoading: (state) =>
      state?.viewPayplan?.status === StoreStatus.LOADING,
  },
});
