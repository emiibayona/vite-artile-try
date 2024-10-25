import service from "@/services/PeoplesService";
import { defineStore } from "pinia";
import { StoreStatus } from "#imports";

const pageProcess = function (value) {
  return {
    data: value?.data || [],
    first_page: value?.from || 1,
    current_page: value?.current_page || 1,
    last_page: value?.last_page || 1,
  };
};
export const peoplesStore = defineStore("peoples", {
  state: () => ({
    peoples: { value: null, status: StoreStatus.LOADING },
    viewPeople: { value: null, status: StoreStatus.LOADING },
    newPeople: { value: null, status: StoreStatus.SUCCESS },
  }),
  actions: {
    async getPeoples(query) {
      this.peoples.status = StoreStatus.LOADING;
      const res = await service.list(query);
      //   this.peoples.value = pageProcess(res);
      this.peoples.value = res;
      this.peoples.status = StoreStatus.SUCCESS;
      return res;
    },
    async getPeopleById(id) {
      this.viewPeople.status = StoreStatus.LOADING;
      const res = await service.getById(id);
      this.viewPeople.value = res;
      this.viewPeople.status = StoreStatus.SUCCESS;
      return res;
    },
    async create(params) {
      this.newPeople.status = StoreStatus.LOADING;
      const res = await service.create(params);
      this.newPeople.value = res;
      this.newPeople.status = StoreStatus.SUCCESS;
      return res;
    },
    async update(params) {
      // this.newPeople.status = StoreStatus.LOADING;
      const res = await service.update(params);
      // this.newPeople.value = res;
      // this.newPeople.status = StoreStatus.SUCCESS;
      return res;
    },
  },
  getters: {
    peoplesList: (state) => state?.peoples?.value,
    getViewContact: (state) => state?.viewPeople?.value,
    isContactsLoading: (state) =>
      state?.peoples?.status === StoreStatus.LOADING,
    isProfileLoading: (state) =>
      state?.viewPeople?.status === StoreStatus.LOADING,
  },
});
