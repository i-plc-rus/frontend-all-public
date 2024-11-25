// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  css: ['assets/css/global.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          silenceDeprecations: ['mixed-decls'],
          additionalData: `
            @use "assets/scss/_variables.scss" as *;
            @use "assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'Beauty Budget Manager',
      meta: [
        {
          name: 'description',
          content:
            'Веб приложение для управления личным бюджетом - просмотр баланса, добавление записей по расходам и доходам, аналитика на графиках.',
        },
      ],
    },
  },
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
});
