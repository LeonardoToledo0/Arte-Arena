<template>
  <div
    class="min-h-screen bg-black/90 flex items-center justify-center inset-0 fixed z-50"
  >
    <div class="text-center">
      <div class="relative w-24 h-24 mx-auto mb-8">
        <div
          class="absolute inset-4 rounded-full flex items-center justify-center"
        >
          <ArrowPathIcon class="h-26 w-26 text-indigo-500 animate-spin-icon" />
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-2">
        <span
          class="animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
        >
          Carregando
        </span>
      </h2>

      <p class="text-white">
        Por favor, aguarde enquanto preparamos sua experiência...
      </p>

      <div class="mt-8 w-64 mx-auto">
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 w-1/3 animate-progress"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
export default {
  name: "DefaultLoading",
  components: { ArrowPathIcon },
};
</script>

<style>
@keyframes spin-icon {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-icon {
  animation: spin-icon 1s linear infinite;
}

/* Animação da barra de progresso */
@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}
</style>