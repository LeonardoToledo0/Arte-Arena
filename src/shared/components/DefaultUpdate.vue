<template>
  <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Cabeçalho -->
      <div
        class="bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-900 p-6 rounded-2xl shadow-lg mb-4"
      >
        <h2 class="text-2xl font-bold text-indigo-200">{{ title }}</h2>
        <p class="text-indigo-300 mt-1">{{ subtitle }}</p>
      </div>

      <!-- Card de detalhes -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div
          class="flex-col space-y-6 w-full justify-center items-start space-x-6"
        >
          <!-- Informações principais -->
          <div class="space-y-6">
            <h3
              class="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2"
            >
              {{ sectionTitle }}
            </h3>

            <!-- Campos específicos para User -->
            <div class="space-y-6" v-if="type === 'user'">
              <!-- Nome -->
              <div
                v-if="data.name"
                class="flex justify-start items-center space-x-3"
              >
                <div
                  class="p-2 mt-4 rounded-full bg-indigo-100 text-indigo-600"
                >
                  <UserIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Nome Completo</p>
                  <input
                    type="text"
                    :value="`${data.name.firstname} ${data.name.lastname}`"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Username -->
              <div v-if="data.username" class="flex items-center space-x-3">
                <div
                  class="p-2 mt-4 rounded-full bg-orange-100 text-orange-600"
                >
                  <UserPlusIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Username</p>
                  <input
                    type="text"
                    :value="data.username"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Email -->
              <div v-if="data.email" class="flex items-center space-x-3">
                <div class="p-2 mt-4 rounded-full bg-blue-100 text-blue-600">
                  <EnvelopeIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Email</p>
                  <input
                    type="text"
                    :value="data.email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Telefone -->
              <div v-if="data.phone" class="flex items-center space-x-3">
                <div class="p-2 mt-4 rounded-full bg-green-100 text-green-600">
                  <PhoneIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Telefone</p>
                  <input
                    type="text"
                    :value="data.phone"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>
              <!-- Password -->
              <div v-if="data.password" class="flex items-center space-x-3">
                <div class="p-2 mt-4 rounded-full bg-red-100 text-red-600">
                  <LockClosedIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Password</p>
                  <input
                    type="password"
                    :value="data.password"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Endereço -->
              <div v-if="data.address" class="flex items-start space-x-3">
                <div
                  class="p-2 mt-6 rounded-full bg-purple-100 text-purple-600"
                >
                  <MapPinIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Endereço</p>
                  <input
                    type="text"
                    :value="`${data.address.street}, ${data.address.number}`"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 mb-2"
                  />
                  <input
                    type="text"
                    :value="`${data.address.city}, ${data.address.zipcode}`"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                  <input
                    v-if="data.address.geolocation"
                    type="text"
                    :value="`Lat: ${data.address.geolocation.lat}, Long: ${data.address.geolocation.long}`"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 mt-2"
                  />
                </div>
              </div>
            </div>
            <!-- Informações para CART -->
            <div class="space-y-6" v-if="type === 'cart'">
              <!-- ID -->
              <div v-if="data.id" class="flex items-center space-x-3">
                <div
                  class="p-2 mt-4 rounded-full bg-indigo-100 text-indigo-600"
                >
                  <HashtagIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">ID do Carrinho</p>
                  <input
                    type="text"
                    :value="data.id"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- UserID -->
              <div v-if="data.userId" class="flex items-center space-x-3">
                <div class="p-2 mt-4 rounded-full bg-green-100 text-green-600">
                  <UserIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">ID do Usuário</p>
                  <input
                    type="text"
                    :value="getUserName(data.userId)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Data -->
              <div v-if="data.date" class="flex items-center space-x-3">
                <div
                  class="p-2 mt-4 rounded-full bg-orange-100 text-orange-600"
                >
                  <CalendarDaysIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Data</p>
                  <input
                    type="text"
                    :value="formattedDate"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Produtos -->
              <div
                v-for="(p, index) in cartProductsWithNames"
                :key="index"
                class="flex items-center space-x-3"
              >
                <div class="p-2 mt-4 rounded-full bg-pink-100 text-pink-600">
                  <FolderIcon class="h-5 w-5" />
                </div>

                <div class="flex-1">
                  <p class="text-sm text-gray-500">Produto</p>
                  <input
                    type="text"
                    :value="p.title"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 truncate"
                    readonly
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Quantidade</p>
                  <input
                    type="text"
                    :value="p.quantity"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                    readonly
                  />
                </div>
              </div>
            </div>

            <!-- Campos específicos para Product -->
            <div class="space-y-6" v-if="type === 'product'">
              <!-- Título -->
              <div v-if="data.title" class="flex items-center space-x-3">
                <div
                  class="p-2 mt-4 rounded-full bg-indigo-100 text-indigo-600"
                >
                  <PencilIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Título</p>
                  <input
                    type="text"
                    :value="data.title"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Preço -->
              <div v-if="data.price" class="flex items-center space-x-3">
                <div class="p-2 mt-4 rounded-full bg-green-100 text-green-600">
                  <CurrencyDollarIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Preço</p>
                  <input
                    type="text"
                    :value="`$${data.price.toFixed(2)}`"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Categoria -->
              <div v-if="data.category" class="flex items-center space-x-3">
                <div
                  class="p-2 mt-4 rounded-full bg-orange-100 text-orange-600"
                >
                  <FolderIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Categoria</p>
                  <input
                    type="text"
                    :value="data.category"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  />
                </div>
              </div>

              <!-- Avaliação -->
              <div v-if="data.rating" class="flex items-center space-x-3">
                <div
                  class="p-2 mt-4 rounded-full bg-yellow-100 text-yellow-600"
                >
                  <StarIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Avaliação</p>
                  <input
                    type="text"
                    :value="`${data.rating.rate} ★ (${data.rating.count} avaliações)`"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                    disabled
                  />
                </div>
              </div>

              <!-- Imagem -->
              <div v-if="data.image" class="flex items-start space-x-3">
                <div class="p-2 mt-4 rounded-full bg-pink-100 text-pink-600">
                  <PhotoIcon class="h-5 w-5" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500">Imagem</p>
                  <img
                    :src="data.image"
                    :alt="data.title"
                    class="h-36 w-36 rounded-md"
                    disabled
                  />

                  <!-- Novo campo após a imagem -->
                  <div class="mt-3">
                    <p class="text-sm text-gray-500">URL da Imagem</p>
                    <input
                      type="text"
                      :value="data.image"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Informações secundárias (quando aplicável) -->
          <div v-if="hasSecondaryInfo" class="space-y-6">
            <h3
              class="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2"
            >
              Detalhes Adicionais
            </h3>

            <div v-if="data.description" class="p-4 rounded-lg">
              <p class="text-sm text-gray-500 mb-2">Descrição</p>
              <textarea
                :value="data.description"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                rows="4"
              ></textarea>
            </div>

            <div
              v-if="data.category && type === 'product'"
              class="p-4 rounded-lg"
            >
              <p class="text-sm text-gray-500 mb-2">Categoria</p>
              <input
                type="text"
                :value="data.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              />
            </div>

            <div v-if="data.price && type === 'product'" class="p-4 rounded-lg">
              <p class="text-sm text-gray-500 mb-2">Preço</p>
              <input
                type="text"
                :value="`$${data.price.toFixed(2)}`"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <!-- Botões de ação -->
        <div
          class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200"
        >
          <!-- Sempre mostra Voltar -->
          <button
            @click="goBack"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Voltar
          </button>

          <!-- Mostra Editar apenas se não for cart -->
          <button
            v-if="type !== 'cart'"
            :disabled="loading"
            @click="editItem"
            class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Editar {{ type === "user" ? "Usuário" : "Produto" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  FolderIcon,
  HashtagIcon,
  LockClosedIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  PhotoIcon,
  StarIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/vue/24/outline";

import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { updateUser, updateProduct } from "../../shared/service/fakestore";
import { toast } from "vue3-toastify";
import type { User } from "../types/user.interface";
import type { Product } from "../types/product.interface";

export default {
  name: "DefaultUpdate",
  props: {
    data: { type: Object, required: true },
    type: {
      type: String as () => "user" | "product" | "cart",
      default: "user",
    },
    getUserName: Function,
    getProductName: Function,
  },
  setup(props) {
    const router = useRouter();
    const loading = ref(false);
    const formData = reactive({ ...props.data });

    const title = computed(() => {
      if (props.type === "user") return "Detalhes do Usuário";
      if (props.type === "product") return "Detalhes do Produto";
      if (props.type === "cart") return "Detalhes do Carrinho";
    });

    const subtitle = computed(() => {
      if (props.type === "user") return "Informações completas do usuário";
      if (props.type === "product") return "Informações completas do produto";
      if (props.type === "cart") return "Informações completas do carrinho";
    });

    const sectionTitle = computed(() => {
      if (props.type === "user") return "Informações Pessoais";
      if (props.type === "product") return "Informações do Produto";
      if (props.type === "cart") return "Informações do Carrinho";
    });

    const hasSecondaryInfo = computed(() => props.type === "product");

    const getUserName = (id: number) => props.getUserName?.(id) ?? "";
    const getProductName = (id: number) => props.getProductName?.(id) ?? "";

    const cartProductsWithNames = computed(() => {
      if (!props.data?.products) return [];
      return props.data.products.map((p: any) => ({
        ...p,
        title: getProductName(p.productId),
      }));
    });

    const formattedDate = computed(() => {
      if (!props.data?.date) return "";
      return new Date(props.data.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    });

    const goBack = () => router.go(-1);

    const editItem = async () => {
      try {
        loading.value = true;

        if (props.type === "user") {
          if (formData.id == null)
            throw new Error("ID do usuário não definido");

          const payload: Partial<User> = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
          };

          await updateUser(formData.id, payload);
          toast.success("Usuário atualizado com sucesso!");
        } else if (props.type === "product") {
          if (formData.id == null)
            throw new Error("ID do produto não definido");

          const payload: Partial<Product> = {
            title: formData.title,
            price: formData.price,
            category: formData.category,
            description: formData.description,
            image: formData.image,
          };

          await updateProduct(formData.id, payload);
          toast.success("Produto atualizado com sucesso!");
        }

        setTimeout(() => {
          goBack();
        }, 2000);
      } catch (error) {
        toast.error("Erro ao atualizar!");
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      formData,
      title,
      subtitle,
      sectionTitle,
      hasSecondaryInfo,
      cartProductsWithNames,
      formattedDate,
      goBack,
      editItem,
      loading,
      getUserName,
      getProductName,
    };
  },
};
</script>
