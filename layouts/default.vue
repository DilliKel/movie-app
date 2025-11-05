<!-- layouts/default.vue (VERSÃO FINAL COMPLETA) -->

<script setup>
// Adicionando este bloco <script setup> para o Nuxt poder carregar componentes.
// Fazemos a importação explícita do componente de busca para garantir que o Nuxt/Vite o encontre,
// mesmo que o auto-import falhe.
import MovieSearch from '~/components/MovieSearch.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- HEADER FIXO (Topo) - Estilizado conforme o design do usuário -->
    <header class="bg-gray-800 text-white shadow-xl p-4 sticky top-0 z-50">
      <div class="container mx-auto flex justify-between items-center flex-wrap gap-4">
        
        <!-- 1. MOVIE APP (Esquerda) -->
        <NuxtLink to="/" class="text-2xl font-bold tracking-wider hover:text-blue-400 transition">
          MOVIE APP
        </NuxtLink>
        
        <!-- 2. BARRA DE BUSCA (Centro) -->
        <div class="flex-grow flex justify-center order-3 md:order-none md:w-auto w-full">
          <!-- O componente MovieSearch é usado aqui -->
          <MovieSearch class="w-full md:max-w-md" />
        </div>
        
        <!-- 3. CATEGORIAS (Direita) -->
        <button class="bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 transition order-2">
          CATEGORIAS
        </button>
      </div>
    </header>

    <!-- CONTEÚDO PRINCIPAL (Abaixo do header fixo) -->
    <main class="container mx-auto p-6">
      <slot /> 
    </main>
  </div>
</template>