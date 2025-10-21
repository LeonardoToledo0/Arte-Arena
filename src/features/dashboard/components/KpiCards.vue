<template>
  <div :class="gridClass" class="p-6 rounded-2xl shadow-lg mb-6">
    <div
      v-for="(card, index) in cards"
      :key="index"
      @click="goToPath(card.path)"
      class="flex items-center flex-col p-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-lg hover:scale-105 hover:border-indigo-600 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <p class="text-gray-400 text-sm">{{ card.label }}</p>
      <p class="text-2xl text-gray-700 text-center font-bold">
        {{ card.value }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  cards: Array,
  gridClass: {
    type: String,
    default: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4",
  },
});

const goToPath = (path) => {
  if (path) {
    router.push(path);
  }
};
</script>