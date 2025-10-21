<template>
  <div
    class="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
  >
    <div
      class="w-full max-w-7xl bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-200"
    >
      <!-- Cabeçalho com gradiente do sidebar -->
      <div class="p-6 text-2xl text-white font-bold">
        <h2 class="text-2xl font-bold text-gray-700">{{ title }}</h2>
        <p class="text-indigo-600 mt-1">{{ subtitle }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Campos dinâmicos baseados no tipo de formulário -->
        <div v-for="field in fields" :key="field.key">
          <label
            :for="field.key"
            class="text-gray-700 text-sm font-medium mb-1 flex items-center"
          >
            <svg
              v-if="field.icon"
              xmlns="http://www.w3.org/2000/svg"
              :class="field.icon.class || 'h-5 w-5 mr-1 text-indigo-500'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="field.icon.path"
              />
            </svg>
            {{ field.label }}
          </label>

          <input
            v-if="field.type !== 'textarea'"
            :id="field.key"
            :type="field.type"
            :placeholder="field.placeholder"
            :required="field.required"
            v-model="formData[field.key]"
            :class="field.inputClass || defaultInputClass"
          />

          <textarea
            v-else
            :id="field.key"
            :rows="field.rows || 4"
            :placeholder="field.placeholder"
            :required="field.required"
            v-model="formData[field.key]"
            :class="field.inputClass || defaultInputClass"
          ></textarea>
        </div>

        <!-- Botão de envio -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            <svg
              v-if="isSubmitting"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isSubmitting ? loadingText : submitText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import type { InitialForm } from "../types/forms.interface";
import { toast } from "vue3-toastify";

// Definindo o tipo para cada campo do formulário
interface FormField {
  key: keyof InitialForm;
  label: string;
  type: "text" | "number" | "email" | "password" | "url" | "textarea";
  placeholder?: string;
  required?: boolean;
  step?: number;
  min?: number;
  rows?: number;
  inputClass?: string;
  icon?: {
    path: string;
    class?: string;
  };
}

export default {
  name: "DefaultInitialForm",
  props: {
    // Tipo do formulário: product ou user
    type: {
      type: String as PropType<"product" | "user">,
      required: true,
    },
    // Dados iniciais
    initialData: {
      type: Object as PropType<InitialForm>,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "Formulário Dinâmico",
    },
    subtitle: {
      type: String,
      default: "Preencha os campos abaixo",
    },
    submitText: {
      type: String,
      default: "Enviar",
    },
    loadingText: {
      type: String,
      default: "Enviando...",
    },
  },
  data() {
    return {
      formData: { ...this.initialData } as InitialForm,
      isSubmitting: false,
      defaultInputClass:
        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-200 ease-in-out bg-white text-gray-700 placeholder-gray-400",
      // Definição dos campos com base no tipo
      fields: [] as FormField[],
    };
  },
  mounted() {
    this.setupFields();
  },
  methods: {
    setupFields() {
      // Define os campos com base no tipo do formulário
      if (this.type === "product") {
        this.fields = [
          {
            key: "title",
            label: "Título do Produto",
            type: "text",
            placeholder: "Ex: Fone de Ouvido Bluetooth",
            required: true,
            icon: {
              path: "M4 6h16M4 12h16M4 18h16",
              class: "h-5 w-5 mr-1 text-indigo-500",
            },
          },
          {
            key: "price",
            label: "Preço (R$)",
            type: "number",
            step: 0.01,
            min: 0,
            placeholder: "0,00",
            required: true,
            icon: {
              path: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              class: "h-5 w-5 mr-1 text-green-500",
            },
          },
          {
            key: "category",
            label: "Categoria",
            type: "text",
            placeholder: "Ex: Eletrônicos",
            required: true,
            icon: {
              path: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
              class: "h-5 w-5 mr-1 text-yellow-500",
            },
          },
          {
            key: "description",
            label: "Descrição",
            type: "textarea",
            placeholder: "Detalhes sobre o produto...",
            required: true,
            rows: 4,
            icon: {
              path: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
              class: "h-5 w-5 mr-1 text-blue-500",
            },
          },
          {
            key: "image",
            label: "URL da Imagem",
            type: "url",
            placeholder: "https://exemplo.com/imagem.jpg",
            required: true,
            icon: {
              path: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
              class: "h-5 w-5 mr-1 text-pink-500",
            },
          },
        ];
      } else if (this.type === "user") {
        this.fields = [
          {
            key: "username",
            label: "Nome de Usuário",
            type: "text",
            placeholder: "Ex: joao.silva",
            required: true,
            icon: {
              path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
              class: "h-5 w-5 mr-1 text-indigo-500",
            },
          },
          {
            key: "email",
            label: "E-mail",
            type: "email",
            placeholder: "Ex: joao@exemplo.com",
            required: true,
            icon: {
              path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              class: "h-5 w-5 mr-1 text-blue-500",
            },
          },
          {
            key: "password",
            label: "Senha",
            type: "password",
            placeholder: "••••••••",
            required: true,
            icon: {
              path: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              class: "h-5 w-5 mr-1 text-red-500",
            },
          },
        ];
      }
    },
    async handleSubmit() {
      this.isSubmitting = true;

      try {
        this.$emit("submit", { ...this.formData });
        toast.success("Formulário enviado com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        toast.error("Erro ao enviar formulário.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>