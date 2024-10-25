const usePayplan = () => {
  const { createPayplan, getPayplansByUser } = payplansStore();
  const { viewPayplan } = storeToRefs(payplansStore());
  return { createPayplan, getPayplansByUser, viewPayplan };
};

export default usePayplan;
