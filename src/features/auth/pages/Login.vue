<template>
  <section
    class="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white flex items-center justify-center px-4"
  >
    <DefaultLoading v-if="loading" />

    <transition name="fade">
      <div
        v-show="showLogin"
        class="bg-white shadow-2xl rounded-2xl max-w-2xl mx-auto w-full p-8 transform transition-transform duration-500 hover:scale-105"
      >
        <!-- Logo -->
        <div class="flex items-center justify-center mb-6">
          <img class="w-26 h-20" :src="logo" alt="logo sentinel" />
        </div>

        <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">
          Faça Login na sua Conta
        </h2>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div class="mb-4">
            <label class="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              v-model="userName"
              placeholder="johndoe"
              required
              class="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              v-model="password"
              placeholder="••••••••"
              required
              class="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Entrar
          </button>
        </form>

        <p class="text-center text-gray-500 mt-6 text-sm">
          {{ footerText }}
          <span
            @click="goToRegister"
            class="text-indigo-600 font-medium hover:underline cursor-pointer"
            >{{ footerLink.text }}</span
          >
        </p>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { userLogin } from "../../../shared/service/fakestore";
import { toast } from "vue3-toastify";
import { useAuthStore } from "../store/useAuthStore";
import Cookies from "js-cookie";
import logo from "../../../assets/sentinel.png";

const router = useRouter();
const showLogin = ref(false);
const loading = ref(false);

const userName = ref("");
const password = ref("");

const footerText = ref("Não possui conta?");
const footerLink = { text: "Crie uma aqui" };

const authStore = useAuthStore();

onMounted(() => {
  setTimeout(() => (showLogin.value = true), 100);
});

const handleLogin = async () => {
  loading.value = true;
  try {
    const credenciais = {
      username: userName.value,
      password: password.value,
    };

    const response = await userLogin(credenciais);

    const token = response.data.token;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const user = payload.user || response.data.username;

    authStore.setAuthData(token, user);

    console.log("Usuário logado:", user);

    toast.success("Usuário logado com sucesso!");

    setTimeout(() => router.push("/dashboard"), 2000);
  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    if (error.response?.status === 401) {
      toast.error(error.response.data || "Credenciais inválidas.");
    } else {
      toast.error("Erro ao logar usuário. Tente novamente.");
    }
  } finally {
    loading.value = false;
  }
};

const goToRegister = () => {
  router.push("/auth/register");
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
