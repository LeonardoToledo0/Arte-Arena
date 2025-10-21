<template>
  <DefaultUpdate
    :data="cartData"
    type="cart"
    :getUserName="getUserName"
    :getProductName="getProductName"
  />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import DefaultUpdate from "../../../shared/components/DefaultUpdate.vue";
import {
  getProducts,
  getSingleCart,
  getUsers,
} from "../../../shared/service/fakestore";
import { onMounted, ref } from "vue";
import { useCartStore } from "../store/useCartStore";

const route = useRoute();
const cartData = ref({});
const users = ref<any[]>([]);
const products = ref<any[]>([]);
const cartStore = useCartStore();

// Função para pegar o nome do usuário pelo ID
const getUserName = (id: number) => {
  const user = users.value.find((u) => u.id === id);
  return user ? user.username : "Desconhecido";
};

// Função para pegar o nome do produto pelo ID
const getProductName = (id: number) => {
  const product = products.value.find((p) => p.id === id);
  return product ? product.title : "Desconhecido";
};

onMounted(async () => {
  const id = parseInt(route.params.id as string);

  // Buscar dados do carrinho
  const cartResponse = await getSingleCart(id);
  const rawCart = cartResponse.data;

  // Adicionar preço e título de cada produto para o store
  const cartWithDetails = {
    ...rawCart,
    products: rawCart.products.map((p: any) => {
      const product = products.value.find((prod) => prod.id === p.productId);
      return {
        ...p,
        price: product?.price ?? 0,
        title: product?.title ?? "Produto desconhecido",
      };
    }),
  };

  cartData.value = cartWithDetails;
  cartStore.setCart(cartWithDetails);

  // Buscar usuários
  const usersResponse = await getUsers();
  users.value = usersResponse.data;

  // Buscar produtos
  const productsResponse = await getProducts();
  products.value = productsResponse.data;
});
</script>
