<template>
  <DefaultLoading v-if="loading" />
  <DefaultInitialForm
    type="user"
    :initial-data="initialUserData"
    title="Cadastrar Novo Usuário"
    subtitle="Preencha os dados para criar uma nova
  conta"
    submit-text="Cadastrar Usuário"
    @submit="handleUserSubmit"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { InitialForm } from "../../../shared/types/forms.interface";
import DefaultInitialForm from "../../../shared/components/DefaultInitialForm.vue";
import DefaultLoading from "../../../shared/components/DefaultLoading.vue";
import { createUser } from "../../../shared/service/fakestore";
import { toast } from "vue3-toastify";
import type { UserInput } from "../../../shared/types/userInput.interface";

export default defineComponent({
  name: "UserFormPage",
  components: {
    DefaultInitialForm,
  },
  data() {
    return {
      loading: false,
      initialUserData: {
        username: "",
        email: "",
        password: "",
      } as InitialForm,
    };
  },
  methods: {
    async handleUserSubmit(data: InitialForm) {
      this.loading = true;
      try {
        const userPayload: UserInput = {
          username: data.username || "",
          email: data.email || "",
          password: data.password || "",
        };
        const response = await createUser(userPayload);
        console.log("Usuário cadastrado:", response.data);
        toast.success("Usuário cadastrado com sucesso!");
        setTimeout(() => this.$router.push("/users/list"), 2000);
        this.loading = false;
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        toast.error("Erro ao cadastrar usuário.");
        this.loading = false;
      }
    },
  },
});
</script>