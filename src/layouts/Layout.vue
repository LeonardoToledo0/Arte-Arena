<script setup lang="ts">
import { shallowRef } from "vue";
import { TopBar, Sidebar } from "./components";

const topBar = shallowRef(TopBar);
const sidebar = shallowRef(Sidebar);
const sidebarOpen = shallowRef(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}
</script>

<template>
  <div class="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
    <component :is="sidebar" :isOpen="sidebarOpen" @close="closeSidebar" />
    <main class="flex-1 flex flex-col min-h-screen overflow-y-auto">
      <component :is="topBar" @toggle-sidebar="toggleSidebar" />
      <div class="flex-1 overflow-y-auto p-6">
        <div class="max-w-7xl mx-auto w-full">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>