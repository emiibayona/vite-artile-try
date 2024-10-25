export const StoreStatus = Object.freeze({
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});

export const UploadsFolders = Object.freeze({
  INVOICES: "invoices",
  PHOTOS: "photos",
});

export const PEOPLE_TYPE = Object.freeze({
  STUDENT: "STUDENT",
  EMPLOYEE: "EMPLOYEE",
  OTHER: "OTHER",
});

export const ApiConfig = Object.freeze({
  VUE_APP_API_URL: "http://127.0.0.1",
  VUE_APP_API_PORT: 8081,
  VUE_APP_API_NAME: "api/",
});

export const ApiURL = `${ApiConfig.VUE_APP_API_URL}:${ApiConfig.VUE_APP_API_PORT}/${ApiConfig.VUE_APP_API_NAME}`;
