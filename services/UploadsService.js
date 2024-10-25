import api from "@/utils/api";

export default {
  upload: async function (params) {
    return api
      .post(`files/?${params.query}`, params.body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res)
      .catch((err) => err);
  },
  get: async function (path) {
    return api
      .get(`files/${path}`)
      .then((res) => res)
      .catch((err) => err);
  },
};
