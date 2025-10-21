<template>
  <section class="p-6">
    <h3 class="text-2xl mb-6 font-bold">
      {{ tableTitle }}
    </h3>

    <div class="overflow-x-auto rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in tableHeaders"
              :key="header.key"
              class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              {{ header.label }}
            </th>
            <!-- Coluna de ações (Detalhes) -->
            <th
              class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <!-- CARRINHOS -->
          <template v-if="type === 'carts'">
            <tr
              v-for="cart in paginatedRows"
              :key="cart.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {{ cart.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {{ getUserName(cart.userId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {{ getUserEmail(cart.userId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {{ getUserPhone(cart.userId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {{ cart.date ? new Date(cart.date).toLocaleDateString() : "" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {{ totalItems(cart) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                ${{ totalAmount(cart).toFixed(2) }}
              </td>
              <!-- Botão de detalhes -->
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <button
                  @click="viewDetails(cart)"
                  class="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  Ver Detalhes
                </button>
              </td>
            </tr>
          </template>

          <!-- PRODUTOS -->
          <template v-else-if="type === 'products'">
            <tr
              v-for="product in paginatedRows"
              :key="product.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img
                      class="h-12 w-12"
                      :src="product.image"
                      :alt="product.title"
                    />
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-800 truncate max-w-xs"
                    >
                      {{ product.title }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ product.category }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                ${{ product.price ?? 0 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {{ product.category ?? "" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm text-gray-800">
                    {{ product.rating?.rate ?? 0 }}
                  </div>
                  <div class="ml-1 text-yellow-400">★</div>
                  <div class="ml-2 text-sm text-gray-500">
                    ({{ product.rating?.count ?? 0 }})
                  </div>
                </div>
              </td>
              <!-- Botão de detalhes -->
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <button
                  @click="viewDetails(product)"
                  class="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  Ver Detalhes
                </button>
              </td>
            </tr>
          </template>

          <!-- USUÁRIOS -->
          <template v-else-if="type === 'users'">
            <tr
              v-for="user in paginatedRows"
              :key="user.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td
                class="px-6 py-4 whitespace-nowrap max-w-xs truncate text-sm text-gray-800"
              >
                {{ user.username }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap max-w-xs truncate text-sm text-gray-800"
              >
                {{ user.email }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap max-w-xs truncate text-sm text-gray-800"
              >
                {{ user.name?.firstname ?? "" }} {{ user.name?.lastname ?? "" }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap max-w-xs truncate text-sm text-gray-800"
              >
                {{ user.address?.street ?? "" }},
                {{ user.address?.number ?? "" }},
                {{ user.address?.city ?? "" }},
                {{ user.address?.zipcode ?? "" }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap max-w-xs truncate text-sm text-gray-800"
              >
                {{ user.phone ?? "" }}
              </td>
              <!-- Botão de detalhes -->
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <button
                  @click="viewDetails(user)"
                  class="text-indigo-600 hover:text-indigo-900 font-medium"
                >
                  Ver Detalhes
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Paginação -->
    <div
      v-if="rows && rows.length > itemsPerPage"
      class="flex items-center justify-between mt-4"
    >
      <button
        @click="currentPage = Math.max(1, currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:border-indigo-400 hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        Anterior
      </button>

      <span class="text-sm text-gray-700">
        Página {{ currentPage }} de {{ totalPages }}
      </span>

      <button
        @click="currentPage = Math.min(totalPages, currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:border-indigo-400 hover:bg-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  type: "carts" | "products" | "users";
  rows: any[];
  products?: any[];
  loading?: boolean;
  getUserName?: (id: number) => string;
  getUserEmail?: (id: number) => string;
  getUserPhone?: (id: number) => string;
}>();

// Emite o evento de detalhes
const emit = defineEmits<{
  "view-details": [item: any];
}>();

const products = computed(() => props.products ?? []);

// Funções auxiliares para usuários
const getUserName = (id: number) => props.getUserName?.(id) ?? "";
const getUserEmail = (id: number) => props.getUserEmail?.(id) ?? "";
const getUserPhone = (id: number) => props.getUserPhone?.(id) ?? "";

// Funções auxiliares para carrinho (protegendo reduce)
const totalItems = (cart: any) => {
  if (!cart.products || !Array.isArray(cart.products)) return 0;
  return cart.products.reduce(
    (acc: number, item: any) => acc + (item.quantity ?? 0),
    0
  );
};

const totalAmount = (cart: any) => {
  if (!cart.products || !Array.isArray(cart.products)) return 0;
  return cart.products.reduce((acc: number, item: any) => {
    const product = products.value.find((p) => p.id === item.productId);
    const price = product?.price ?? 0;
    const quantity = item?.quantity ?? 0;
    return acc + price * quantity;
  }, 0);
};

// Cabeçalhos dinâmicos
const tableHeaders = computed(() => {
  switch (props.type) {
    case "carts":
      return [
        { key: "id", label: "Pedido" },
        { key: "cliente", label: "Cliente" },
        { key: "email", label: "Email" },
        { key: "telefone", label: "Telefone" },
        { key: "data", label: "Data" },
        { key: "totalItens", label: "Itens" },
        { key: "total", label: "Total" },
      ];
    case "products":
      return [
        { key: "product", label: "Produto" },
        { key: "price", label: "Preço" },
        { key: "category", label: "Categoria" },
        { key: "rating", label: "Avaliação" },
      ];
    case "users":
      return [
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
        { key: "name", label: "Nome" },
        { key: "address", label: "Endereço" },
        { key: "phone", label: "Telefone" },
      ];
    default:
      return [];
  }
});

// Título dinâmico
const tableTitle = computed(() => {
  switch (props.type) {
    case "carts":
      return "Pedidos Recentes";
    case "products":
      return "Top Produtos";
    case "users":
      return "Usuários";
    default:
      return "";
  }
});

// Paginação
const itemsPerPage = 10;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.rows.length / itemsPerPage));

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.rows.slice(start, end);
});

// Função para emitir o evento de detalhes
const viewDetails = (item: any) => {
  emit("view-details", item);
};
</script>