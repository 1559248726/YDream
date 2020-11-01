<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
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
      { hid: 'description', name: 'description', content: '余齐松(Dexter Yu)的个人网站' },
      { name: 'keywords', content: '余齐松、个人网站、Dexter Yu' },
    ]
  }
}
</script>
