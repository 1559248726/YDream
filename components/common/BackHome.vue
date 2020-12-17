<template>
  <div style="position: fixed; top: 30px; left: 30px; z-index: 1000">
    <v-btn
      icon
      color="accent"
      @click="backHome"
    >
      <v-icon
        v-if="type === 'home'"
        large
      >
        mdi-home
      </v-icon>
      <v-icon
        v-else-if="type === 'gameCenter'"
        large
      >
        mdi-arrow-left-circle
      </v-icon>
    </v-btn>
    <p class="back-text">
      <span v-if="type === 'home'">主页</span>
      <span v-else-if="type === 'gameCenter'">游戏中心</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'BackHome',
  props: {
    type: {
      type: String,
      default() {
        return 'home'
      }
    }
  },
  methods: {
    backHome() {
      let href;
      if (this.type === 'home')
        href = '/'
      else if (this.type === 'gameCenter')
        href = '/game/'
      this.$router.push(href)
    }
  }
}
</script>

<style scoped lang="scss">
  .v-btn:hover + .back-text {
    opacity: 1;
    top: 36px;
  }

  .back-text {
    z-index: -10;
    opacity: 0;
    transition: all 400ms;
    text-align: center;
    position: absolute;
    font-size: 12px;
    width: 48px;
    top: 24px;
    left: -6px;
    right: -6px;
  }
</style>
