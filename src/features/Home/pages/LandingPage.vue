<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <LandHeader />

    <!-- Hero Section -->
    <LandHero />

    <!-- Features Section -->
    <LandFeatures />

    <!-- Dashboard Preview Section -->
    <LandPreview />

    <!-- FAQ Section -->
    <LandFaq />

    <!-- Footer -->
    <LandFooter />
  </div>
</template>

<script setup>
import LandFaq from "../components/LandFaq.vue";
import LandFeatures from "../components/LandFeatures.vue";
import LandFooter from "../components/LandFooter.vue";
import LandHeader from "../components/LandHeader.vue";
import LandHero from "../components/LandHero.vue";
import LandPreview from "../components/LandPreview.vue";
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>