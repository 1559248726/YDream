<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer
      color="#939597"
      :absolute="!fixed"
      app
    >
      <div class="footer-wrapper">
        <div class="footer-head">
          <span>Copyright &copy; {{ new Date().getFullYear() }}<a href="https://ydream.xyz/" target="_blank">
            ydream.xyz
          </a></span>
          <span>Powered by DexterYu</span>
        </div>
        <span><a href="http://beian.miit.gov.cn/" target="_blank">
          赣ICP备20001364号-2
        </a></span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    };
  },
  head: {
    meta: [
      { hid: "description", name: "description", content: "YDream的首页" },
      { name: "keywords", content: "YDream" }
    ]
  }
};
</script>

<style scoped lang="scss">
.v-footer {
  font-size: 14px;
  text-align: center;
  flex-direction: column;

  a {
    color: #575656;
  }

  div {
    display: flex;
    &.footer-wrapper {
      flex-direction: row;
      @media (max-width: $media-md) {
        flex-direction: column;
      }
    }
    &.footer-head {
      flex-direction: row;
      @media (max-width: $media-xs) {
        flex-direction: column;
      }
    }

    span {
      flex-grow: 1;
      margin: 0 5px;
    }
  }
}
</style>
