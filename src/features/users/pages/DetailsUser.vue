<template>
  <DefaultUpdate v-if="userData.id" :data="userData" type="user" />
</template>
    
<script setup lang="ts">
import DefaultUpdate from "../../../shared/components/DefaultUpdate.vue";
import { useRoute } from "vue-router";
import { getSingleUser } from "../../../shared/service/fakestore";
import { onMounted, ref } from "vue";
import type { User } from "../../../shared/types/user.interface";

const route = useRoute();

// Inicializa como User parcial vazio
const userData = ref<Partial<User>>({});

onMounted(async () => {
  const id = parseInt(route.params.id as string, 10);
  if (!isNaN(id)) {
    const response = await getSingleUser(id);
    userData.value = response.data;
  }
});
</script>
