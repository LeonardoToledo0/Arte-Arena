<template>
  <DefaultLoading v-if="loading" />

  <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
    <DefaultTables
      type="products"
      :rows="filteredRows"
      @view-details="handleViewDetails"
    />
  </div>
</template>

<script setup >
import { onMounted, ref } from "vue";
import DefaultTables from "../../../shared/components/DefaultTables.vue";
import { toast } from "vue3-toastify";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { getAll } from "../../../shared/service/getAll";
import {
  searchType,
  searchValue,
  filteredRows,
  rows,
} from "../../../utils/serachFilters";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getAll();
    searchType.value = "products";
    rows.value = response.products;
    toast.success("Produtos carregados com sucesso!");
    loading.value = false;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao carregar produtos.");
  }
});
const handleViewDetails = (item) => {
  router.push(`/products/details/${item.id}`);
};
</script>
