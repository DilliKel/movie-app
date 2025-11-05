<script setup>
// Importando o Header global corretamente
import AppHeader from '~/components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">

    <!-- HEADER NOVO -->
    <AppHeader />

    <!-- Conteúdo da página -->
    <main class="container mx-auto p-6 pt-20">
      <slot />
    </main>
  </div>
</template>
