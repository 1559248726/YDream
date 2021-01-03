<template>
  <div class="center">
    <v-expansion-panels
      class="text-center"
      style="width: 300px"
    >
      <v-expansion-panel
        v-for="(item, i) in items"
        :key="i"
      >
        <v-expansion-panel-header>
          {{item.title}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            {{item.content}}
            <p style="font-size: 12px">{{item.type === 0?'':'（仅支持电脑端）'}}</p>
          </div>
          <v-btn
            elevation="0"
            width="80px"
            :disabled=!!item.status
            @click.stop="btnClick(item.title, item.type)"
          >
            <span v-if="item.type === 0 || item.type === 1 && device">
              进入
            </span>
            <span
              v-else-if="item.type === 1 && !device"
              class="copy-button"
              @click="copyWebsite(item.title)"
            >
              复制网址
            </span>
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      centered
      vertical
    >
      {{snackbarMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <back-home></back-home>
  </div>
</template>

<script>
import BackHome from '../../components/common/BackHome'

export default {
  layout: 'default',
  components: {
    BackHome
  },
  data() {
    return {
      items: [
        {
          title: 'zoo',
          content: '前端闯关类游戏，致敬淘宝UED前端团队的智勇大闯关校招游戏',
          type: 1,
          status: 0
        },
        {
          title: 'puzzle',
          content: '拼图游戏，具有保存用户游戏记录、个人排行榜和站内排行榜等功能',
          type: 0,
          status: 0
        }
      ],
      device: '',
      snackbar: false,
      snackbarMessage: ''
    }
  },
  computed: {
    url() {
      let url = window.location.href
      if (url.charAt(url.length - 1) === '/')
        url = url.substring(0, url.length - 1)
      return url
    }
  },
  mounted() {
    const userAgent = navigator.userAgent
    this.device = !userAgent.includes('iPhone') && !userAgent.includes('Android')
  },
  methods: {
    btnClick(title, type) {
      if (type === 0 || type === 1 && this.device)
        this.$router.push('/game/' + title)
      else {
        document.getElementsByClassName('copy-button')[0].click()
      }
    },
    copyWebsite(title) {
      this.$copyText(this.url + '/' + title).then(() => {
        this.snackbarMessage = '复制成功'
        this.snackbar = true
      }, () => {
        this.snackbarMessage = '复制失败'
        this.snackbar = true
      })
    }
  },
  head: {
    titleTemplate: '%s • Y Dream 的游戏',
    title: '游戏合集'
  }
}
</script>
