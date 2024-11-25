import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: 3000
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // prevents scss deprecation warnings
        }
      }
    }
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/primevue-overrides.css',
    'primeicons/primeicons.css'
  ],
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/test-utils/module'
  ],
  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      }
    }
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    detectBrowserLanguage: false // auto-detect has major issues with cache
  },
  // These are routes for mock api, they are disabled in prod environment.
  // It's generally needed for preview deployment on Vercel, because server side there can only
  // use the same origin and external API is not intended.
  // If you need to use it in prod, set SERVE_MOCK_API to 'true'
  serverHandlers:
    process.env.NODE_ENV === 'development' ||
    process.env.SERVE_MOCK_API === 'true'
      ? [
          {
            route: '/api/transactions',
            method: 'get',
            handler: '~/server/mock-api/transactions.get.ts'
          },
          {
            route: '/api/transactions',
            method: 'post',
            handler: '~/server/mock-api/transactions.post.ts'
          },
          {
            route: '/api/transactions/:id',
            method: 'put',
            handler: '~/server/mock-api/transactions.put.ts'
          },
          {
            route: '/api/transactions/:id',
            method: 'delete',
            handler: '~/server/mock-api/transactions.delete.ts'
          },
          {
            route: '/api/category-metadata',
            handler: '~/server/mock-api/category-metadata.ts'
          }
        ]
      : [],
  nitro: {
    preset: 'vercel',
    storage: {
      mockApi: {
        driver: 'memory'
      }
    }
  },
  appConfig: {
    /**
     * Of there are more categories in view than this value, the remainder will be grouped together.
     * If you increase this value you must ensure that there are sufficient predefined colors
     * in CategoryChart.vue
     */
    maxCategoriesInFilter: 5,
    /** Capacity of transactions LRU cache. This number of last transaction responses will be cached. */
    transactionsCacheSize: 5
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? '/api/', //set to http://localhost:3001 to use mock server via json-server (npm run mock-server:start)
      /** App will show error if number of transactions in view is at least this value */
      maxTransactions: 10000,
      /** Flag for showing a warning about using mock-api, see serverHandlers config entry */
      showMockApiWarning:
        process.env.NUXT_PUBLIC_SHOW_MOCK_API_WARNING === 'true'
    }
  }
});
