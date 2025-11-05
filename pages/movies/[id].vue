<script setup lang="ts">
import { computed } from 'vue';
// 1. CORREÇÃO: Importar useImageBaseUrl() no lugar de IMAGE_BASE_URL
import { useTmdbFetch, useImageBaseUrl } from '~/utils/api'; 
import { NuxtLink } from '#components';

// Aplica o mesmo layout da home
definePageMeta({
  layout: 'default'
})

// Define a tipagem para o filme
interface MovieDetail {
  title: string;
  overview: string; 
  poster_path: string; 
  release_date: string; 
  vote_average: number;
  genres: { id: number; name: string }[];
}

// 2. CORREÇÃO: Chamar a função e definir a variável local
const IMAGE_BASE_URL = useImageBaseUrl();

// 1. Captura o parâmetro ID da URL (Roteamento Dinâmico do Nuxt)
const route = useRoute();
const movieId = route.params.id as string; // Garante que é uma string

// 2. Faz a requisição à API
const { data: movieData, pending, error } = await useTmdbFetch<MovieDetail>(`/movie/${movieId}`);

// 3. URLs e Título da Página
const posterUrl = computed(() => {
  const path = movieData.value?.poster_path;
  // Usa a variável local IMAGE_BASE_URL
  return path ? `${IMAGE_BASE_URL}w500${path}` : null;
});

useHead({
  title: movieData.value ? `${movieData.value.title} - Detalhes` : 'Carregando Detalhes...',
});
</script>

<template>
  <div class="p-6">
    <div v-if="pending" class="text-center py-12">
      <p class="text-lg text-blue-500">Carregando detalhes do filme...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-lg text-red-600">
        Erro ao carregar os detalhes do filme (ID: {{ movieId }}).
      </p>
    </div>

    <div v-else-if="movieData" class="bg-white shadow-2xl rounded-xl overflow-hidden md:flex">
      
      <div class="md:w-1/3">
        <img 
          :src="posterUrl || 'placeholder-image.png'" 
          :alt="`Pôster de ${movieData.title}`" 
          class="w-full h-full object-cover"
        />
      </div>

      <div class="md:w-2/3 p-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4">{{ movieData.title }}</h1>
        
        <p class="text-xl font-semibold text-gray-600 mb-6">
          Avaliação Média: 
          <span class="text-yellow-500 font-bold">{{ movieData.vote_average.toFixed(1) }}</span> / 10
        </p>
        
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Sinopse</h2>
        <p class="text-gray-700 leading-relaxed mb-6">{{ movieData.overview || 'Sinopse indisponível.' }}</p>

        <div class="flex flex-wrap gap-4 text-sm">
          <p class="bg-gray-200 p-2 rounded-lg font-medium">
            Lançamento: 
            <span class="text-indigo-700">{{ new Date(movieData.release_date).toLocaleDateString('pt-BR') }}</span>
          </p>
          <p v-for="genre in movieData.genres" :key="genre.id" class="bg-indigo-500 text-white p-2 rounded-lg font-medium">
            {{ genre.name }}
          </p>
        </div>

        <NuxtLink to="/" class="mt-8 inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition">
          ← Voltar para o Catálogo
        </NuxtLink>
      </div>
    </div>
  </div>
</template>