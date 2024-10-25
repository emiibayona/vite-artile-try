import service from "@/services/AuthService.js";
import { defineStore } from "pinia";
import moment from "moment";
import cookies from "js-cookie";
import { StoreStatus } from "#imports";

// Token
const setAuthToken = (_, auth) => {
  _.authorisation.value = auth;
  cookies.set("user_auth", JSON.stringify(auth));
};
const clearAuthToken = (_) => {
  _.authorisation.value = null;
  cookies.set("user_auth", null);
};

const isTokenAlive = (_) => {
  const auth =
    _.authorisation.value || JSON.parse(cookies.get("user_auth") || null);
  if (!auth) {
    return false;
  }

  return (
    moment(auth.get_time).add(Number(auth.ttl), "minutes").toDate() >
    moment().toDate()
  );
};

// User
const setUserInfo = (_, user) => {
  if (user?.data?.error) return;
  _.user.value = user;
  localStorage?.setItem("email", user?.email);
  localStorage?.setItem("userId", user?.id);
};
const cleanUserInfo = (_) => {
  _.user.value = null;
  localStorage?.removeItem("email");
  localStorage?.removeItem("userId");
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: { value: null, status: StoreStatus.SUCCESS },
    authorisation: { value: null },
  }),
  actions: {
    async loggedUser() {
      return await service.loggedUser();
    },
    async login(data) {
      this.user.status = StoreStatus.LOADING;
      const res = await service.login(data);

      if (res?.status === 200 || res?.status === StoreStatus.SUCCESS) {
        setUserInfo(this, res.user);
        setAuthToken(this, res.authorisation);
        this.user.status = StoreStatus.SUCCESS;
      } else {
        setUserInfo(this, res?.data?.error || res?.data?.errors);
        this.user.status = "error";
        this.user.status = StoreStatus.ERROR;
      }
    },

    async logout() {
      const res = await service.logout();
      if (res.status === StoreStatus.SUCCESS) {
        cleanUserInfo(this);
        clearAuthToken(this);
      }
    },
    async rehydrateUser() {
      const res = await this.loggedUser();
      setUserInfo(this, res);
      return res;
    },
  },
  getters: {
    getUser: (state) => state.user.value,
    isLoggedIn: (state) =>
      state.user.value && state.user.status === StoreStatus.SUCCESS,
    getUserIsLoading: (state) => state.user.status === StoreStatus.LOADING,
    errorOnUser: (state) => state.user.status === StoreStatus.ERROR,
  },
});
