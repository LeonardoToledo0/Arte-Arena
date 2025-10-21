<template>
  <section v-if="show" class="w-1/2">
    <div class="relative w-full max-w-xs mx-auto">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <MagnifyingGlassIcon class="w-5 h-5 text-indigo-500" />
      </div>
      <input
        type="text"
        v-model="searchValue"
        class="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-colors"
        :placeholder="placeholder"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { searchValue } from "../../utils/serachFilters";

defineProps<{ placeholder: string; show: boolean }>();
</script>