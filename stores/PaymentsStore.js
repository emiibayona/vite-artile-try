import PaymentsService from "@/services/PaymentsService";
export const paymentsStore = defineStore("payments", {
  state: () => ({
    payments: { value: [], status: StoreStatus.SUCCESS },
    newPayment: { value: null, status: StoreStatus.SUCCESS },
  }),
  actions: {
    async createPayment(params) {
      return await PaymentsService.create(params);
    },
    async getPayments(params) {
      this.payments.status = StoreStatus.LOADING;
      const res = await PaymentsService.getPayments(params);
      this.payments.value = res;
      this.payments.status = StoreStatus.SUCCESS;
      return res;
    },
  },
});
