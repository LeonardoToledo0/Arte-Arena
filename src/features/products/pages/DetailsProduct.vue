<template>
  <DefaultLoading v-if="loading" />
  <DefaultUpdate v-if="productData.id" :data="productData" type="product" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import DefaultUpdate from "../../../shared/components/DefaultUpdate.vue";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { getSingleProduct } from "../../../shared/service/fakestore";
import { onMounted, ref } from "vue";
import type { Product } from "../../../shared/types/product.interface";
import { toast } from "vue3-toastify";

const route = useRoute();
const productData = ref<Partial<Product>>({});
const loading = ref(false);

onMounted(async () => {
  try {
    const id = parseInt(route.params.id as string, 10);
    if (!isNaN(id)) {
      const response = await getSingleProduct(id);
      productData.value = response.data;
      toast.success("Produto carregado com sucesso!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Erro ao carregar produto.");
  }
});
</script>