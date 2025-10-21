<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { MenuGroup, MenuGroupBottom } from "../constants/MenuGroup";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { useAuthStore } from "../../features/auth/store/useAuthStore";
import Cookies from "js-cookie";

const authStore = useAuthStore();

const { isOpen } = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close"]);

const route = useRoute();
const router = useRouter();

const openMenus = ref<string[]>([]);

const goTo = (path: string) => {
  try {
    authStore.logout();
    Cookies.remove("token");
    Cookies.remove("user");
    emit("close");
    router.push({ path });
  } catch (error) {
    console.error(error);
  }
};

const toggleMenu = (title: string) => {
  if (openMenus.value.includes(title)) {
    openMenus.value = openMenus.value.filter((t) => t !== title);
  } else {
    openMenus.value.push(title);
  }
};

function onClose() {
  emit("close");
}

const isOpenMenu = (title: string) => openMenus.value.includes(title);
</script>

<template>
  <!-- Overlay mobile -->
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-75 z-20 transition-opacity lg:hidden"
    :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    @click="onClose"
  ></div>

  <!-- Sidebar -->
  <div
    class="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-indigo-900 shadow-lg transform transition-transform z-30 flex flex-col justify-between lg:translate-x-0 lg:static lg:inset-0 text-gray-300"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Header -->
    <div>
      <div
        class="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-gray-700"
      >
        <img class="w-16 h-10" src="/sentinel.png" alt=" logo sentinel" />
        <button
          type="button"
          class="p-2 rounded-md text-gray-400 hover:text-white lg:hidden"
          @click="onClose"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>

      <!-- Menu Superior -->
      <nav class="mt-4 px-2">
        <div class="space-y-1">
          <div v-for="item in MenuGroup" :key="item.title">
            <!-- Item principal -->
            <a
              href="#"
              class="group flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
              :class="
                item.path === route.path
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300'
              "
              @click="item.children ? toggleMenu(item.title) : goTo(item.path)"
            >
              <div class="flex items-center">
                <component
                  :is="item.icon"
                  class="mr-3 h-5 w-5"
                  :class="
                    item.path === route.path ? 'text-white' : 'text-gray-400'
                  "
                />
                {{ item.title }}
              </div>
              <div v-if="item.children">
                <component
                  :is="isOpenMenu(item.title) ? ChevronUpIcon : ChevronDownIcon"
                  class="h-4 w-4 text-indigo-400"
                />
              </div>
            </a>

            <!-- Submenu -->
            <div
              v-if="item.children && isOpenMenu(item.title)"
              class="ml-6 mt-1 space-y-1"
            >
              <a
                v-for="child in item.children"
                :key="child.title"
                href="#"
                class="group flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
                :class="
                  child.path === route.path
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400'
                "
                @click="goTo(child.path)"
              >
                <component
                  :is="child.icon"
                  class="mr-2 h-4 w-4"
                  :class="
                    child.path === route.path ? 'text-white' : 'text-gray-500'
                  "
                />
                {{ child.title }}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Menu Inferior -->
    <div class="border-t border-gray-700 px-2 py-4">
      <nav>
        <div class="space-y-1">
          <a
            v-for="item in MenuGroupBottom"
            :key="item.title"
            href="#"
            class="group flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
            @click="goTo(item.path)"
          >
            <component
              :is="item.icon"
              class="mr-3 h-5 w-5"
              :class="item.path === route.path ? 'text-white' : 'text-gray-400'"
            />
            {{ item.title }}
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>