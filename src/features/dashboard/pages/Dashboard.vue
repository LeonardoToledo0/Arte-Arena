<template>
  <DefaultLoading v-if="loading" />
  <div
    class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen space-y-6 rounded-2xl"
  >
    <h2 class="text-2xl font-bold text-gray-700">Dashboard</h2>

    <!-- Cards de KPI -->
    <KpiCards :cards="kpiCards" />

    <!-- Gráficos lado a lado (responsivo) -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Gráfico de vendas por mês -->
      <div
        class="bg-white p-6 rounded-2xl shadow-lg flex-1 border border-gray-200 hover:shadow-lg hover:scale-105 hover:border-indigo-600 transition-all duration-300 ease-in-out cursor-pointer"
        v-if="salesSeries.length"
      >
        <h3 class="text-lg font-semibold mb-4 text-gray-700">Vendas por mês</h3>
        <div class="h-72">
          <apexchart
            type="bar"
            height="100%"
            :options="salesOptions"
            :series="salesSeries"
          />
        </div>
      </div>

      <!-- Gráfico de pizza por categoria -->
      <div
        class="bg-white px-6 rounded-2xl shadow-lg flex-1 flex flex-col items-center justify-center gap-4 border border-gray-200 hover:shadow-lg hover:scale-105 hover:border-indigo-600 transition-all duration-300 ease-in-out cursor-pointer"
        v-if="categorySeries.length"
      >
        <h3 class="text-lg font-semibold mb-2 w-full text-center text-gray-700">
          Vendas por Categoria
        </h3>
        <div class="w-full h-72 flex items-center justify-center">
          <apexchart
            type="donut"
            width="100%"
            height="100%"
            :options="categoryOptions"
            :series="categorySeries"
          />
        </div>
      </div>
    </div>

    <!-- Nova linha com mais dois gráficos -->
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Gráfico de produtos por categoria -->
      <div
        class="bg-white p-6 rounded-2xl shadow-lg flex-1 border border-gray-200 hover:shadow-lg hover:scale-105 hover:border-indigo-600 transition-all duration-300 ease-in-out cursor-pointer"
        v-if="categoryProductSeries.length"
      >
        <h3 class="text-lg font-semibold mb-4 text-gray-700">
          Produtos por Categoria
        </h3>
        <div class="h-72">
          <apexchart
            type="area"
            height="100%"
            :options="categoryProductOptions"
            :series="categoryProductSeries"
          />
        </div>
      </div>

      <!-- Gráfico de cadastro de usuários por mês -->
      <div
        class="bg-white p-6 rounded-2xl shadow-lg flex-1 border border-gray-200 hover:shadow-lg hover:scale-105 hover:border-indigo-600 transition-all duration-300 ease-in-out cursor-pointer"
        v-if="userRegistrationSeries.length"
      >
        <h3 class="text-lg font-semibold mb-4 text-gray-700">
          Cadastros por Mês
        </h3>
        <div class="h-72">
          <apexchart
            type="radar"
            height="100%"
            :options="userRegistrationOptions"
            :series="userRegistrationSeries"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import KpiCards from "../components/KpiCards.vue";
import ApexCharts from "vue3-apexcharts";
import DefaultTables from "../../../shared/components/DefaultTables.vue";
import { getAll } from "../../../shared/service/getAll";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { toast } from "vue3-toastify";

const products = ref([]);
const users = ref([]);
const carts = ref([]);
const loading = ref(false);

// KPI Computeds
const totalProductsSold = computed(() =>
  carts.value.reduce(
    (acc, cart) => acc + cart.products.reduce((a, p) => a + p.quantity, 0),
    0
  )
);
const totalSales = computed(() =>
  carts.value.reduce((acc, cart) => {
    const totalCart = cart.products.reduce((sum, item) => {
      const product = products.value.find((p) => p.id === item.productId);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);
    return acc + totalCart;
  }, 0)
);
const kpiCards = computed(() => [
  {
    label: "Total de Produtos",
    value: products.value.length,
    path: "/products/list",
  },
  {
    label: "Total de Usuários",
    value: users.value.length,
    path: "/users/list",
  },
  {
    label: "Total de Pedidos",
    value: carts.value.length,
    path: "/orders",
  },
  {
    label: "Produtos Vendidos",
    value: totalProductsSold.value,
    path: "/orders",
  },
  {
    label: "Total de Vendas",
    value: `$${totalSales.value.toFixed(2)}`,
    path: "/orders",
  },
]);

// Gráficos existentes
const salesSeries = ref([]);
const salesOptions = ref({
  chart: { id: "sales-chart", background: "#ffffff" },
  xaxis: { categories: [], labels: { style: { colors: "#6b7280" } } },
  yaxis: { labels: { style: { colors: "#6b7280" } } },
  tooltip: {
    theme: "light",
    style: { fontSize: "12px" },
  },
  grid: {
    borderColor: "#e5e7eb",
  },
});

const categorySeries = ref([]);
const categoryOptions = ref({
  chart: { type: "donut", background: "#ffffff" },
  labels: [],
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex];
      return `${name} ${val.toFixed(0)}%`;
    },
  },
  tooltip: {
    theme: "light",
    y: {
      formatter: (val) => `$${val.toFixed(2)}`,
    },
    style: { fontSize: "12px" },
  },
  legend: {
    position: "bottom",
    horizontalAlign: "center",
    labels: {
      colors: "#6b7280",
    },
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total",
            color: "#6b7280",
          },
        },
      },
    },
  },
});

// Novos gráficos
const categoryProductSeries = ref([]);
const categoryProductOptions = ref({
  chart: { id: "category-product-chart", background: "#ffffff" },
  xaxis: { categories: [], labels: { style: { colors: "#6b7280" } } },
  yaxis: { labels: { style: { colors: "#6b7280" } } },
  tooltip: {
    theme: "light",
    style: { fontSize: "12px" },
  },
  grid: {
    borderColor: "#e5e7eb",
  },
});

// Gráfico de cadastro de usuários por mês
const userRegistrationSeries = ref([]);
const userRegistrationOptions = ref({
  chart: { id: "user-registration-chart", background: "#ffffff" },
  xaxis: { categories: [], labels: { style: { colors: "#6b7280" } } },
  yaxis: { labels: { style: { colors: "#6b7280" } } },
  tooltip: {
    theme: "light",
    style: { fontSize: "12px" },
  },
  grid: {
    borderColor: "#e5e7eb",
  },
});

onMounted(async () => {
  loading.value = true;
  try {
    const data = await getAll();
    products.value = data.products;
    users.value = data.users;
    carts.value = data.carts;

    // Gráfico de vendas por mês
    const monthMap = {};
    carts.value.forEach((cart) => {
      const month = new Date(cart.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      const totalCart = cart.products.reduce((sum, item) => {
        const product = products.value.find((p) => p.id === item.productId);
        return product ? sum + product.price * item.quantity : sum;
      }, 0);
      monthMap[month] = (monthMap[month] || 0) + totalCart;
    });
    salesOptions.value.xaxis.categories = Object.keys(monthMap);
    salesSeries.value = [
      { name: "Total Vendido", data: Object.values(monthMap) },
    ];

    // Gráfico de pizza por categoria
    const categoryMap = {};
    carts.value.forEach((cart) => {
      cart.products.forEach((item) => {
        const product = products.value.find((p) => p.id === item.productId);
        if (!product) return;
        categoryMap[product.category] =
          (categoryMap[product.category] || 0) + product.price * item.quantity;
      });
    });

    // Filtra categorias com valor > 0
    const filteredCategories = Object.entries(categoryMap).filter(
      ([_category, value]) => value > 0
    );
    categoryOptions.value.labels = filteredCategories.map(
      ([category]) => category
    );
    categorySeries.value = filteredCategories.map(([_, value]) => value);

    // Gráfico de produtos por categoria
    const productCategoryMap = {};
    products.value.forEach((product) => {
      productCategoryMap[product.category] =
        (productCategoryMap[product.category] || 0) + 1;
    });
    categoryProductOptions.value.xaxis.categories =
      Object.keys(productCategoryMap);
    categoryProductSeries.value = [
      { name: "Quantidade", data: Object.values(productCategoryMap) },
    ];

    const userRegistrationMap = {};
    users.value.forEach((user) => {
      const month = `Mês ${user.id % 12 || 12}`;
      userRegistrationMap[month] = (userRegistrationMap[month] || 0) + 1;
    });
    userRegistrationOptions.value.xaxis.categories =
      Object.keys(userRegistrationMap);
    userRegistrationSeries.value = [
      { name: "Cadastros", data: Object.values(userRegistrationMap) },
    ];
    toast.success("Dashboard carregado com sucesso!");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao carregar dashboard.");
  } finally {
    loading.value = false;
  }
});
</script>

<script>
export default {
  components: { apexchart: ApexCharts },
};
</script>