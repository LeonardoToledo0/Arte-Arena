<template>
  <footer
    class="bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white py-16"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- Logo e descrição -->
        <div>
          <div class="flex items-center mb-4">
            <img class="w-26 h-20" src="/sentinel.png" alt="Logo Sentinel" />
          </div>
          <p class="text-gray-400">
            Soluções completas para gerenciamento de e-commerce moderno e
            eficiente.
          </p>
        </div>

        <div v-for="(section, i) in footerSections" :key="i">
          <h4 class="text-lg font-semibold mb-4">{{ section.title }}</h4>
          <ul class="space-y-2 text-gray-400">
            <li v-for="(link, j) in section.links" :key="j">
              <a
                v-if="link.url"
                :href="link.url"
                class="hover:text-white transition-colors duration-200"
              >
                {{ link.name }}
              </a>
              <span v-else>{{ link.name }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-gray-700 mt-10 pt-8 text-center text-gray-500 text-sm"
      >
        &copy; {{ currentYear }} Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const footerSections = ref([
  {
    title: "Produto",
    links: [
      { name: "Recursos", url: "#" },
      { name: "Preços", url: "#" },
      { name: "API", url: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre", url: "#" },
      { name: "Blog", url: "#" },
      { name: "Carreiras", url: "#" },
    ],
  },
  {
    title: "Contato",
    links: [
      { name: "leotoledo010@gmail.com" },
      { name: "+55 (11) 99297-1390" },
    ],
  },
]);

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
a:hover {
  color: #ffffff;
  text-decoration: underline;
}
</style>
