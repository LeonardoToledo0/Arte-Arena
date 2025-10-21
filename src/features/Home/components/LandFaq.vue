<template>
  <section
    id="faq"
    class="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Título -->
      <div class="text-center mb-14">
        <h2 class="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
          Perguntas Frequentes
        </h2>
        <p class="text-lg text-gray-600">
          Tudo que você precisa saber sobre nosso backoffice
        </p>
      </div>

      <!-- FAQ -->
      <div class="space-y-4">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="border border-indigo-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
        >
          <button
            @click="toggleAccordion(index)"
            class="w-full flex justify-between items-center p-6 text-left hover:bg-indigo-50 transition-colors"
          >
            <h3 class="text-lg font-semibold text-gray-800">
              {{ item.pergunta }}
            </h3>
            <ChevronDoubleDownIcon
              class="w-5 h-5 text-indigo-500 transition-transform duration-300"
              :class="{ 'rotate-180': activeIndex === index }"
            />
          </button>

          <Transition
            enter-active-class="transition-all duration-400 ease-in-out"
            leave-active-class="transition-all duration-400 ease-in-out"
            @before-enter="beforeEnter"
            @enter="enter"
            @before-leave="beforeLeave"
            @leave="leave"
          >
            <div
              v-show="activeIndex === index"
              class="px-6 pb-6 text-gray-600 overflow-hidden leading-relaxed"
            >
              {{ item.resposta }}
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ChevronDoubleDownIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

// Perguntas frequentes dinâmicas
const faqs = ref([
  {
    pergunta: "Como posso integrar com minha loja?",
    resposta:
      "Nossa plataforma oferece APIs RESTful e integrações prontas para os principais sistemas de e-commerce. Basta seguir nosso guia de integração passo a passo.",
  },
  {
    pergunta: "É possível personalizar o dashboard?",
    resposta:
      "Sim! Você pode personalizar widgets, métricas exibidas e até mesmo criar relatórios personalizados para atender exatamente às suas necessidades.",
  },
  {
    pergunta: "Quais são os requisitos técnicos?",
    resposta:
      "Nosso sistema é 100% web-based e roda direto no navegador. Nenhuma instalação é necessária — basta acesso à internet e um navegador moderno.",
  },
  {
    pergunta: "Como é feito o suporte?",
    resposta:
      "Oferecemos suporte 24/7 via chat, email e telefone. Além disso, contamos com uma base de conhecimento com tutoriais detalhados e documentação completa.",
  },
]);

const activeIndex = ref(null);

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

// Animações suaves no abrir/fechar do acordeon
const beforeEnter = (el) => {
  el.style.height = "0";
};
const enter = (el) => {
  el.style.height = el.scrollHeight + "px";
};
const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};
const leave = (el) => {
  el.style.height = "0";
};
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
