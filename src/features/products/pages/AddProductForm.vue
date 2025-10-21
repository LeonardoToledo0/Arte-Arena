<template>
  <DefaultLoading v-if="loading" />
  <DefaultInitialForm
    v-else
    type="product"
    :initial-data="initialProductData"
    title="Adicionar Novo Produto"
    subtitle="Preencha as informações abaixo para cadastrar o produto"
    submit-text="Adicionar Produto"
    @submit="handleProductSubmit"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { InitialForm } from "../../../shared/types/forms.interface";
import DefaultInitialForm from "../../../shared/components/DefaultInitialForm.vue";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { createProduct } from "../../../shared/service/fakestore";
import type { ProductInput } from "../../../shared/types/productInput.interface";
import { toast } from "vue3-toastify";

export default defineComponent({
  name: "AddProductForm",
  components: {
    DefaultInitialForm,
    DefaultLoading,
  },
  data() {
    return {
      loading: false,
      initialProductData: {
        type: "product",
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        icon: "",
      } as InitialForm,
    };
  },
  methods: {
    async handleProductSubmit(data: InitialForm) {
      this.loading = true;
      try {
        const productPayload: ProductInput = {
          title: data.title || "",
          price: data.price || 0,
          description: data.description || "",
          category: data.category || "",
          image: data.image || "",
        };

        const response = await createProduct(productPayload);

        console.log("Produto cadastrado:", response.data);
        toast.success("Produto cadastrado com sucesso!");
        setTimeout(() => this.$router.push("/products/list"), 2000);
        this.loading = false;
      } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        toast.error("Erro ao cadastrar produto.");
        this.loading = false;
      }
    },
  },
});
</script>