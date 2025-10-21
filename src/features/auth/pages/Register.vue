<template>
  <DefaultLoading v-if="loading" />
  <section
    class="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] flex items-center justify-center px-4"
  >
    <transition name="fade">
      <div
        v-show="showRegister"
        class="bg-white shadow-2xl rounded-2xl max-w-2xl mx-auto w-full p-8 transform transition-transform duration-500 hover:scale-105"
      >
        <!-- Logo -->
        <div class="flex items-center justify-center mb-6">
          <img class="w-26 h-20" :src="logo" alt="logo sentinel" />
        </div>

        <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">
          Crie sua Conta
        </h2>

        <!-- Form Dinâmico -->
        <form @submit.prevent="handleRegister" class="space-y-5">
          <div v-for="(field, index) in registerFields" :key="index">
            <label class="block text-gray-700 mb-1">{{ field.label }}</label>
            <input
              :type="field.type"
              v-model="field.model"
              :placeholder="field.placeholder"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 transition-all"
              :class="
                field.type === 'email'
                  ? 'focus:ring-indigo-500'
                  : 'focus:ring-purple-500'
              "
            />
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Cadastrar
          </button>
        </form>

        <!-- Link dinâmico -->
        <p class="text-center text-gray-500 mt-6 text-sm">
          Já possui conta?
          <a
            @click="goToLogin"
            class="text-indigo-600 font-medium hover:underline cursor-pointer"
            >Entre aqui</a
          >
        </p>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { createUser } from "../../../shared/service/fakestore";
import { toast } from "vue3-toastify";
import logo from "../../../assets/sentinel.png";

const router = useRouter();
const showRegister = ref(false);
const loading = ref(false);

// Campos dinâmicos do cadastro
const id = ref(0);
const username = ref("");
const email = ref("");
const password = ref("");

const registerFields = reactive([
  {
    label: "Username",
    type: "text",
    placeholder: "Digite seu nome de usuário",
    model: username,
  },
  { label: "Email", type: "email", placeholder: "seu@email.com", model: email },
  {
    label: "Senha",
    type: "password",
    placeholder: "••••••••",
    model: password,
  },
]);

// Fade-in ao carregar
onMounted(() => {
  setTimeout(() => (showRegister.value = true), 100);
});

// Função de cadastro
const handleRegister = async () => {
  const user = {
    id: id.value,
    username: username.value,
    email: email.value,
    password: password.value,
  };
  loading.value = true;
  try {
    const response = await createUser(user);
    console.log("Usuário cadastrado:", response);
    toast.success("Usuário cadastrado com sucesso!");
    loading.value = false;
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    toast.error("Erro ao cadastrar usuário.");
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push("/auth/login");
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
