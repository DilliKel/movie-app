import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getPopularMovies, searchMoviesByQuery } from '@/utils/api'

export const useMovieStore = defineStore('movies', () => {
  const movies = ref([])
  const loading = ref(false)

  async function fetchPopularMovies() {
    loading.value = true
    movies.value = await getPopularMovies()
    loading.value = false
  }

  async function searchMovies(query: string) {
    if (!query.trim()) {
      return fetchPopularMovies()
    }
    loading.value = true
    movies.value = await searchMoviesByQuery(query)
    loading.value = false
  }

  return {
    movies,
    loading,
    fetchPopularMovies,
    searchMovies
  }
})
