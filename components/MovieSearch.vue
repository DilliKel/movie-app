<script setup lang="ts">
import { ref } from 'vue';

// Estado local para o termo de busca
const searchQuery = ref('');
const router = useRouter(); // Composable do Nuxt para navegação

const handleSearch = () => {
  // 1. Remove espaços extras e verifica se há algo para buscar
  const query = searchQuery.value.trim();
  
  if (query) {
    // 2. Navega para a página inicial, adicionando o termo de busca como parâmetro (query string)
    router.push({
      path: '/',
      query: { q: query } // Usaremos 'q' como nome do parâmetro de busca
    });
    // 3. Limpa o campo após a busca (opcional, mas bom para UX)
    searchQuery.value = '';
  } else {
     // Se o campo estiver vazio e o usuário clicar, volta para a lista popular
    router.push('/');
  }
}
</script>

<template>
  <form @submit.prevent="handleSearch" class="flex items-center w-full max-w-sm">
    <input
      v-model="searchQuery"
      type="search"
      placeholder="BUSCAR FILMES"
      class="p-2 border border-gray-600 rounded-l-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-150"
    >
      🔍
    </button>
  </form>
</template>