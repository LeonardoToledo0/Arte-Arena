<template>
  <header
    class="bg-white/90 shadow-md sticky top-0 z-50 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <img class="w-16 h-10" :src="logo" alt="Logo Sentinel" />
        </div>

        <!-- Navegação desktop -->
        <nav class="hidden md:flex space-x-8 items-center">
          <a
            v-for="(item, index) in navLinks"
            :key="index"
            href="#"
            @click.prevent="scrollToSection(item.href)"
            class="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
          >
            {{ item.name }}
          </a>
          <button
            @click="goToLogin"
            class="ml-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Entrar
          </button>
        </nav>

        <div class="md:hidden">
          <button
            @click="mobileOpen = !mobileOpen"
            class="text-gray-600 focus:outline-none"
          >
            <svg
              v-if="!mobileOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <Bars3Icon v-else class="h-6 w-6 block" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide-fade">
        <div v-if="mobileOpen" class="md:hidden mt-4 space-y-2">
          <a
            v-for="(item, index) in navLinks"
            :key="'mobile-' + index"
            href="#"
            @click.prevent="
              scrollToSection(item.href);
              mobileOpen = false;
            "
            class="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md transition-colors duration-200 font-medium"
          >
            {{ item.name }}
          </a>
          <button
            @click="goToLogin"
            class="w-full mb-6 lg:mb-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Entrar
          </button>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import logo from "../../../assets/sentinel.png";

const router = useRouter();
const mobileOpen = ref(false);

const navLinks = ref([
  { name: "Recursos", href: "features" },
  { name: "Dashboard", href: "dashboard" },
  { name: "FAQ", href: "faq" },
]);

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: "smooth",
    });
  }
};

const goToLogin = () => {
  router.push("/auth/login");
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
