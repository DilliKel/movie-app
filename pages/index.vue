<script setup lang="ts">
import { computed } from 'vue';
import { useTmdbFetch, useImageBaseUrl } from '~/utils/api'; 
import { NuxtLink } from '#components';

definePageMeta({
  layout: 'default'
})

// Tipagem mínima
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

// 1. Obter o parâmetro de busca da URL
const route = useRoute();
const searchQuery = computed(() => route.query.q as string | undefined);

// Define a URL do endpoint e os parâmetros baseados no estado de busca
// Se houver query, busca por filmes; senão, busca populares
const endpoint = computed(() => searchQuery.value ? '/search/movie' : '/movie/popular');

const fetchParams = computed(() => {
  if (searchQuery.value) {
    return { query: searchQuery.value };
  }
  return {};
});

// 2. Fazer a requisição reagindo às mudanças no endpoint/parâmetros
const { data: moviesData, pending, error } = await useTmdbFetch<{ results: Movie[] }>(
  endpoint.value, 
  fetchParams.value
);

// 3. Processar dados
const movies = computed<Movie[]>(() => moviesData.value?.results || []);
const hasError = computed(() => !!error.value);
const IMAGE_BASE_URL = useImageBaseUrl();

// Título dinâmico da página (AGORA DENTRO DO MAIN CONTENT)
const pageTitle = computed(() => 
  searchQuery.value 
    ? `Resultados para "${searchQuery.value}"`
    : 'Catálogo de Filmes Populares'
);
</script>

<template>
  <!-- O p-4 foi removido aqui e colocado no layout para o main content -->
  <div>
    <!-- TÍTULO DINÂMICO AQUI -->
    <h1 class="text-4xl font-extrabold text-gray-800 mb-8">{{ pageTitle }}</h1>

    <div v-if="pending" class="text-center py-12">
      <p class="text-2xl text-blue-500">Carregando filmes...</p>
    </div>

    <div v-else-if="hasError" class="text-center py-12">
      <p class="text-2xl text-red-600">
        Ops! Erro ao carregar os filmes. Verifique sua chave de API ou tente novamente.
      </p>
      <pre v-if="error">{{ error }}</pre>
    </div>
    
    <!-- Mensagem de Sem Resultados -->
    <div v-else-if="movies.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-500">
        Nenhum filme encontrado para "{{ searchQuery }}". Tente outra busca.
      </p>
      <NuxtLink to="/" class="mt-4 inline-block text-blue-600 hover:underline">
        Voltar para os Populares
      </NuxtLink>
    </div>

    <!-- Lista de Filmes (Grid) -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <NuxtLink
        v-for="movie in movies"
        :key="movie.id"
        :to="`/movies/${movie.id}`"
        class="bg-white rounded-lg shadow-xl overflow-hidden transition transform hover:scale-[1.03] hover:shadow-2xl"
        :aria-label="`Ver detalhes de ${movie.title}`"
      >
        <img
          v-if="movie.poster_path"
          :src="`${IMAGE_BASE_URL}w500${movie.poster_path}`"
          :alt="`Pôster de ${movie.title}`"
          class="w-full h-auto object-cover aspect-[2/3]"
          loading="lazy"
        />
        <div v-else class="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
            <p class="text-sm text-gray-500 p-2 text-center">Sem Pôster</p>
        </div>
        
        <div class="p-3">
          <h2 class="text-base font-semibold truncate text-gray-800" :title="movie.title">
            {{ movie.title }}
          </h2>
          <p class="text-xs text-gray-600 mt-1">
            Avaliação: 
            <span class="font-bold text-yellow-600">{{ movie.vote_average.toFixed(1) }}</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>