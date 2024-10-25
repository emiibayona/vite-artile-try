import api from "@/utils/api";

export default {
  create: async function (body) {
    return api
      .post("payments", body)
      .then((res) => res)
      .catch((res) => res.response);
  },
  getPayments: async function (params) {
    return api
      .get("payments", { params: params })
      .then((res) => res)
      .catch((res) => res.response);
  },
};
