<template>
  <section
    id="features"
    class="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          Recursos Poderosos
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Tudo que você precisa para gerenciar seu e-commerce com eficiência.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-500 p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div
            class="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center text-white text-2xl shadow-md transition-transform duration-300 group-hover:scale-110"
            :class="feature.color"
          >
            <component :is="feature.icon" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  ChartBarIcon,
  CubeTransparentIcon,
  BanknotesIcon,
} from "@heroicons/vue/24/outline";

const features = ref([
  {
    title: "Dashboard Inteligente",
    description:
      "Visualize métricas importantes em tempo real com gráficos interativos.",
    icon: ChartBarIcon,
    color: "bg-gradient-to-r from-indigo-500 to-purple-500",
  },
  {
    title: "Controle de Estoque",
    description:
      "Monitore produtos, categorias e níveis de estoque automaticamente.",
    icon: CubeTransparentIcon,
    color: "bg-gradient-to-r from-green-500 to-blue-500",
  },
  {
    title: "Relatórios Financeiros",
    description:
      "Acompanhe vendas, lucros e tendências com relatórios detalhados.",
    icon: BanknotesIcon,
    color: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
]);
</script>

<style scoped>
.group:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
