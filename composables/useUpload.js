import { ApiURL } from "@/utils/constants";
const useUpload = () => {
  const { upload } = uploadsStore();

  function getUrl(path, query) {
    return (
      ApiURL + `files/${encodeURIComponent(path)}${query ? "/?" + query : ""}`
    );
  }
  return { getUrl, upload };
};

export default useUpload;
