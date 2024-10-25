<template>
  <div v-if="totalPages > 1" class="pagination">
    <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
      <
    </button>

    <span v-for="page in totalPages" :key="page">
      <button :class="{ active: currentPage === page }" @click="goToPage(page)">
        {{ page }}
      </button>
    </span>

    <button
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      >
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
const emits = defineEmits(["page-changed"]);
const props = defineProps({
  page: { type: Number, default: 1 },
  total: { type: Number, default: 0 },
  limit: { type: Number, default: 5 },
});
const totalPages = computed(() => Math.ceil(props.total / props.limit));
const currentPage = ref(1);

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  emits("page-changed", {
    page: currentPage.value,
    offset: (page - 1) * props.limit,
    limit: props.limit,
  });
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  width: 30px;
  padding: 5px;
}
button.active {
  font-weight: bold;
  background-color: #c4d8d3;
  color: white;
  border-radius: 4px;
}
button:hover {
  font-weight: bold;
  &:disabled {
    font-weight: normal;
  }
}
</style>
