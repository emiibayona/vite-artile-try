import { computed } from "vue";
const useDues = () => {
  function dueIsEmpty(val) {
    return Object.values(val).every((x) => x === null);
  }
  function dueIsFullfilled(val) {
    return Object.values(val).every((x) => x);
  }

  // computeds

  return { dueIsEmpty, dueIsFullfilled };
};

export default useDues;
