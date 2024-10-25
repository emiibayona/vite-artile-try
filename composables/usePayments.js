const usePayments = function () {
  const { createPayment, getPayments } = paymentsStore();

  const PAYMENT_METHODS_ENUM = Object.freeze({
    CASH: { id: "CASH", name: "Efectivo" },
    CREDIT_CARD: { id: "CREDIT_CARD", name: "Credito" },
    DEBIT_CARD: { id: "DEBIT_CARD", name: "Debito" },
    BANK_TRANSFER: { id: "BANK_TRANSFER", name: "Transferencia" },
  });

  const PAYMENT_METHODS = computed(() =>
    Object.entries(PAYMENT_METHODS_ENUM).map((x) => x[1])
  );

  const PAYMENT_TYPES = computed(() => ({
    INCOME: "INCOME",
    OUTCOME: "OUTCOME",
  }));

  return {
    createPayment,
    getMovements: getPayments,
    PAYMENT_METHODS_ENUM,
    PAYMENT_METHODS,
    PAYMENT_TYPES,
  };
};

export default usePayments;
