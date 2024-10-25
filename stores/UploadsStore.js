import UploadsService from "~/services/UploadsService";
export const uploadsStore = defineStore("uploads", {
  state: () => ({
    upload: { value: null, status: StoreStatus.SUCCESS },
  }),
  actions: {
    async upload(params) {
      this.upload.status = StoreStatus.LOADING;
      const res = await UploadsService.upload(params);
      this.upload.status = StoreStatus.SUCCESS;

      return res;
    },
    async get(params) {
      const res = await UploadsService.get(params);
      return res;
    },
  },
});
