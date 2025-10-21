<template>
  <header
    class="bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-900 shadow-lg z-10 lg:z-50 justify-between items-center"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center space-x-2 justify-center">
          <button
            type="button"
            class="p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white lg:hidden"
            @click="emit('toggle-sidebar')"
          >
            <Bars3Icon class="h-6 w-6 block lg:hidden" />
          </button>
        </div>

        <div class="flex justify-center items-center space-x-4">
          <DefaultSearch placeholder="Buscar..." :show="showSearch" />

          <div class="flex items-center">
            <div
              class="h-8 w-8 rounded-full bg-white flex items-center justify-center"
            >
              <UserIcon class="h-5 w-5 text-indigo-500" />
            </div>
            <span
              class="ml-2 text-sm font-medium text-gray-200 hidden md:block"
              >{{ user }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { BellIcon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/outline";
import DefaultSearch from "../../shared/components/DefaultSearch.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "../../features/auth/store/useAuthStore";

const authStore = useAuthStore();

const emit = defineEmits(["toggle-sidebar"]);
const route = useRoute();
const showSearch = computed(() => route.name !== "Dashboard");
const user = computed(() => authStore.user);
</script>