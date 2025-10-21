<template>
  <section
    class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white"
  >
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Gerencie seu E-commerce <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#C084FC]"
          >
            com Facilidade
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Um backoffice moderno e completo para controlar produtos, pedidos,
          usuários e relatórios em tempo real — tudo em um só lugar.
        </p>
      </div>

      <!-- Apple-style Browser Window -->
      <div class="relative max-w-4xl mx-auto animate-fade-in">
        <div class="bg-gray-800 rounded-t-xl p-4">
          <div class="flex space-x-2">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        <div
          class="bg-white border-2 border-gray-200 rounded-b-xl p-6 min-h-[400px]"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-700">Dashboard</h3>
            <div class="flex space-x-2">
              <div
                class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center"
              >
                <UserIcon class="h-5 w-5 text-indigo-500" />
              </div>
            </div>
          </div>

          <!-- Dashboard Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div
              v-for="(card, index) in cards"
              :key="index"
              class="p-4 rounded-lg border border-gray-200"
              :class="card.bg"
            >
              <div :class="card.color" class="text-2xl font-bold">
                {{ card.value }}
              </div>
              <div class="text-sm text-gray-600">{{ card.label }}</div>
            </div>
          </div>

          <!-- Chart Preview -->
          <div
            class="bg-gray-50 p-4 rounded-lg border border-gray-200 h-48 flex items-center justify-center"
          >
            <div class="text-center w-full">
              <div class="text-gray-500 mb-2">Visualização de Dados</div>
              <div class="flex items-end justify-center space-x-1 h-24">
                <div
                  v-for="(bar, i) in chartData"
                  :key="i"
                  class="w-4 rounded-t animate-bounce"
                  :style="{
                    height: bar.height + '%',
                    backgroundColor: bar.color,
                    animationDelay: `${i * 0.1}s`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 flex justify-center space-x-4">
        <button
          @click="goToRegister()"
          class="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
        >
          Começar Agora
        </button>
        <button
          @click="goToLogin()"
          class="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-700 transition-all"
        >
          Ver Demonstração
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { UserIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => {
  router.push("/auth/login");
};
const goToRegister = () => {
  router.push("/auth/register");
};

const cards = ref([
  {
    value: "1,234",
    label: "Total de Vendas",
    bg: "bg-gradient-to-br from-indigo-50 to-purple-50",
    color: "text-indigo-600",
  },
  {
    value: "567",
    label: "Produtos",
    bg: "bg-gradient-to-br from-green-50 to-blue-50",
    color: "text-green-600",
  },
  {
    value: "89",
    label: "Pedidos",
    bg: "bg-gradient-to-br from-yellow-50 to-orange-50",
    color: "text-yellow-600",
  },
]);

const chartData = ref([
  { height: 60, color: "#6366F1" },
  { height: 80, color: "#8B5CF6" },
  { height: 40, color: "#22C55E" },
  { height: 70, color: "#EAB308" },
  { height: 50, color: "#EF4444" },
]);
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-bounce {
  animation: bounce 1.5s infinite;
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
