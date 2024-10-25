const useCenters = function () {
  const centerStore = centersStore();
  const { getCentersList: centersList } = storeToRefs(centerStore);
  return { centersList };
};

export default useCenters;
