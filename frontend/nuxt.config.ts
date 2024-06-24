import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  build: {
    transpile: ['vuetify'],
  },
  css: ["@/assets/styles/main.scss"],
  ssr: false,
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BASE_URL || 'http://localhost:8000',
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        sss: {
          additionalData: '@import "@/assets/styles/_variables.scss"',
        },
      },
    },
  },

})
