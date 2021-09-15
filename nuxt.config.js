import colors from "vuetify/es5/util/colors";
import config from './config/config'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,
  target: "server",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s • DexterYu 的网站",
    title: "羽梦",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { "http-equiv": "Content-Type", content: "text/html; charset=utf-8" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global router
  router: {
    // trailingSlash: false
    resourceHints: false
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/style/common",
    "~/assets/style/transition"
  ],

  // The pageTransition Property
  pageTransition: {
    // name: 'my-page',
    // mode: 'out-in',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // 表单验证
    { src: "@/plugins/vee-validate", ssr: true }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // 剪贴板
    "nuxt-clipboard2"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // proxy: true
    baseURL: config.proxy
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: config.proxy
    }
  },

  proxy: {
    "/api": {
      target: config.proxy
      // changeOrigin: true, // 表示是否跨域
      // pathRewrite: {
      //   '^/api': '/', // 把 /api 替换成 /
      // }
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/style/variables.scss"],
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
          success: colors.green.lighten2
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: {
      allChunks: true
    },
    transpile: [
      "vee-validate/dist/rules"
    ]
    // extend(config, ctx) {
    //   // You can extend webpack config here
    // }
    // analyze: true,
    // assetFilter(assetFilename) {
    //   return assetFilename.endsWith('.js');
    // }
  }
};
