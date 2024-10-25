const usePeoples = () => {
  const { getPeoples, getPeopleById, peoplesList, create, update } =
    peoplesStore();

  const { getViewContact } = storeToRefs(peoplesStore());

  const peoples = computed(() => peoplesList);
  return {
    getPeoples,
    getPeopleById,
    peoples,
    createPeople: create,
    updatePeople: update,
    currentStudent: getViewContact,
  };
};

export default usePeoples;
