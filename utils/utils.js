export const pageProcess = function (value) {
  return {
    data: value?.data || [],
    first_page: value?.from || 1,
    current_page: value?.current_page || 1,
    last_page: value?.last_page || 1,
  };
};
