<template>
  <v-app>
    <v-main>
      <nuxt/>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>Copyright &copy; {{ new Date().getFullYear() }} ydream.xyz</span>
      <a href="http://beian.miit.gov.cn/" target="_blank">
        赣ICP备20001364号-2
      </a>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    }
  },
  head: {
    meta: [
      { hid: 'description', name: 'description', content: 'YDream的首页' },
      { name: 'keywords', content: 'YDream' },
    ]
  }
}
</script>
