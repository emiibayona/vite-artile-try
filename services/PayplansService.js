import api from "@/utils/api";

export default {
  list: async function (params) {
    return api
      .get("payplans", { params: params })
      .then((res) => res)
      .catch((error) => error.response);
  },

  getById: async function (id) {
    return api
      .get(`payplans/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  },
  getByUserId: async function (userId) {
    return api
      .get(`payplans/user/${userId}`)
      .then((res) => res)
      .catch((error) => error.response);
  },
  create: async function (params) {
    return api
      .post("payplans", params)
      .then((res) => res)
      .catch((error) => error.response);
  },

  update: async function (id, params) {
    return api
      .put(`payplans/${id}`, params)
      .then((res) => res)
      .catch((error) => error.response);
  },

  delete: async function (id) {
    return api
      .delete(`payplans/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  },
};
