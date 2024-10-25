import api from "@/utils/api";

export default {
  getCenters: async function (params) {
    return api.get("centers", { params: params });
  },
};
