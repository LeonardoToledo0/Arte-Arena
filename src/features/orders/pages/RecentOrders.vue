<template>
  <DefaultLoading v-if="loading" />
  <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
    <DefaultTables
      type="carts"
      :rows="filteredRows"
      :products="products"
      :getUserName="getUserName"
      :getUserEmail="getUserEmail"
      :getUserPhone="getUserPhone"
      @view-details="handleViewDetails"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAll } from "../../../shared/service/getAll";
import {
  rows,
  searchType,
  filteredRows,
  users as globalUsers,
  products as globalProducts,
} from "../../../utils/serachFilters";
import type { User } from "../../../shared/types/user.interface";
import DefaultTables from "../../../shared/components/DefaultTables.vue";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { toast } from "vue3-toastify";

// Tipagem
interface Item {
  id: number;
}

// Refs locais
const products = ref([]);
const users = ref<User[]>([]);
const carts = ref([]);
const loading = ref(false);

// Hook de navegação
const router = useRouter();

// Define o tipo de busca global
searchType.value = "cartProducts";

// Carrega dados ao montar
onMounted(async () => {
  loading.value = true;
  try {
    const response = await getAll();

    // Preenche os arrays locais
    products.value = response.products;
    users.value = response.users;
    carts.value = response.carts;

    // Atualiza os arrays globais usados no filtro
    globalUsers.value = response.users;
    globalProducts.value = response.products;

    // Atualiza o array global rows para filtragem
    rows.value = carts.value;
    toast.success("Pedidos carregados com sucesso!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao carregar pedidos.");
  } finally {
    loading.value = false;
  }
});

// Funções auxiliares
const getUserEmail = (id: number): string => {
  const user = users.value.find((u) => u.id === id);
  return user ? user.email : "Desconhecido";
};

const getUserPhone = (id: number): string => {
  const user = users.value.find((u) => u.id === id);
  return user ? user.phone : "Desconhecido";
};

const getUserName = (id: number): string => {
  const user = users.value.find((u) => u.id === id);
  return user ? user.username : "Desconhecido";
};

// Ação ao clicar em detalhes
const handleViewDetails = (item: Item) => {
  router.push(`/orders/details/${item.id}`);
};
</script>
