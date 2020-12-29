import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s • Y Dream 的网站',
    title: '羽梦',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global router
  router: {
    // trailingSlash: false
    resourceHints: false
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/style/common',
    '~/assets/style/transition',
  ],

  // The pageTransition Property
  pageTransition: {
    // name: 'my-page',
    // mode: 'out-in',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // 表单验证
    '@/plugins/vee-validate'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // 剪贴板
    'nuxt-clipboard2'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:4041', // 目标接口域名
      // changeOrigin: true, // 表示是否跨域
      // pathRewrite: {
      //   '^/api': '/', // 把 /api 替换成 /
      // }
    }
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     baseURL: 'http://127.0.0.1:8080/api'
  //   }
  // },

  // pwa: {
  //   // icon: false, // disables the icon module
  //   manifest: {
  //     name: 'Y Dream',
  //     lang: 'zh-CN',
  //     useWebmanifestExtension: false
  //   }
  // },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/style/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.blue.lighten2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.lighten2,
        }
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: {
      allChunks: true
    },
    // analyze: true,
    // assetFilter(assetFilename) {
    //   return assetFilename.endsWith('.js');
    // }
  },
}
