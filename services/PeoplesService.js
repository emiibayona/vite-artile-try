import api from "@/utils/api";

export default {
  list: async function (params) {
    return api
      .get("peoples", { params: params })
      .then((res) => res)
      .catch((error) => error.response);
  },
  getById: async function (id) {
    return api
      .get(`peoples/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  },
  create: async function (params) {
    return api
      .post("peoples", params)
      .then((res) => res)
      .catch((error) => error.response);
  },
  update: async function (params) {
    return api
      .patch("peoples/" + params.id, params)
      .then((res) => res)
      .catch((error) => error.response);
  },
};
