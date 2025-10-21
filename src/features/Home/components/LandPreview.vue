<template>
  <section
    id="dashboard"
    class="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Cabeçalho -->
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          Dashboard Moderno
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Interface intuitiva com visualização de dados em tempo real
        </p>
      </div>

      <!-- Corpo -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <!-- Texto e Lista -->
          <div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              Controle Total do Seu Negócio
            </h3>
            <p class="text-gray-600 mb-6">
              Acompanhe vendas, produtos, clientes e estoque em um único painel.
              Receba alertas importantes e tome decisões baseadas em dados
              reais.
            </p>
            <ul class="space-y-3">
              <li
                v-for="(item, index) in featureList"
                :key="index"
                class="flex items-center text-gray-700"
              >
                <CheckIcon class="w-5 h-5 text-green-500 mr-2" />
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Cards e gráfico fake -->
          <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div
                v-for="(card, index) in metrics"
                :key="index"
                :class="[
                  'text-white p-4 rounded-lg transition-all duration-300 hover:scale-105 shadow',
                  card.color,
                ]"
              >
                <div class="text-2xl font-bold">
                  {{ card.value }}
                </div>
                <div class="text-xs lg:text-sm opacity-80">
                  {{ card.label }}
                </div>
              </div>
            </div>

            <div
              class="h-32 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg flex flex-col items-center justify-center"
            >
              <ChartBarIcon class="w-8 h-8 text-orange-500 mb-1" />
              <div class="text-gray-600 font-medium">Gráfico de Vendas</div>
              <div class="text-sm text-gray-500">Tendência em crescimento</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { CheckIcon, ChartBarIcon } from "@heroicons/vue/24/outline";

const featureList = ref([
  "Gráficos interativos em tempo real",
  "Integração com APIs de pagamento",
  "Exportação de relatórios em PDF/Excel",
  "Alertas automáticos de estoque",
  "Controle de clientes e pedidos",
]);

const metrics = ref([
  {
    label: "Vendas Hoje",
    value: "R$ 45.230",
    color: "bg-gradient-to-r from-indigo-500 to-purple-500",
  },
  {
    label: "Novos Clientes",
    value: "128",
    color: "bg-gradient-to-r from-green-500 to-blue-500",
  },
]);
</script>

<style scoped>
div:hover > .hover\\:scale-105 {
  transform: scale(1.05);
}
</style>
