import api from "@/utils/api";

export default {
  login: async function (body) {
    return api
      .post("auth/login", body)
      .then((res) => res)
      .catch((res) => res.response);
  },
  logout: async function () {
    return api
      .post("auth/logout")
      .then((res) => res)
      .catch((res) => res.response);
  },
  loggedUser: async () => {
    return api
      .get("auth/user")
      .then((res) => res)
      .catch((res) => res.response);
  },
  setToken: (token) => {
    api.setAuthToken(token);
  },
};
