// nuxt.config.ts

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  css: [
    // Seu caminho de CSS local:
    'assets/css/main.css'
  ],

  // --- 1. MUDANÇA CRUCIAL PARA RESOLVER O ERRO ---
  // Nuxt requer que a configuração do PostCSS seja feita aqui.
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // --------------------------------------------------

  // --- 2. MELHORIA PARA A API (Obrigatório configurar no .env) ---
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.NUXT_PUBLIC_TMDB_API_KEY,
      // Adicione as URLs de base do TMDb aqui, se ainda não estiverem no .env.local:
      tmdbBaseUrl: process.env.NUXT_PUBLIC_TMDB_BASE_URL,
      tmdbImageBaseUrl: process.env.NUXT_PUBLIC_TMDB_IMAGE_BASE_URL,
    }
  },
  // -------------------------------------------------------------

  compatibilityDate: '2025-11-05'
})