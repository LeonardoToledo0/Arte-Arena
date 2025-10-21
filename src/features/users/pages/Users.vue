<template>
  <DefaultLoading v-if="loading" />
  <DefaultTalbes
    type="users"
    :rows="filteredRows"
    @view-details="handleViewDetails"
  />
</template>

<script setup >
import { onMounted, ref } from "vue";
import DefaultTalbes from "../../../shared/components/DefaultTables.vue";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { getAll } from "../../../shared/service/getAll";
import { rows, searchType, filteredRows } from "../../../utils/serachFilters";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getAll();

    searchType.value = "users";

    rows.value = response.users;
    toast.success("Usuários carregados com sucesso!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao carregar usuários.");
  } finally {
    loading.value = false;
  }
});

const handleViewDetails = (item) => {
  router.push(`/users/details/${item.id}`);
};
</script>