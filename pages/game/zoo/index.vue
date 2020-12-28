<template>
  <div class="center">
    <div class="text-center">
      <p>欢迎来到 zoo 游戏入口～</p>
      <p>听说过关主要靠人品，无情转发可以加 Buff～</p>
      <p>这是一个前端闯关游戏，请找到游戏<a color="primary">入口</a>，然后开始游戏</p>
      <img
        src="~/assets/img/zoo/game-zoo-0.jpg"
        alt="看好你"
      />
      <p style="color: white">致敬淘宝UED前端团队</p>
    </div>
    <back-home type = 'gameCenter'></back-home>
    <zoo-hint :hint = "hint"></zoo-hint>
  </div>
</template>

<script>
import BackHome from '../../../components/common/BackHome'
import ZooHint from '../../../components/game/ZooHint'

export default {
  layout: 'game/zoo',
  components: {
    ZooHint,
    BackHome
  },
  data() {
    return {
      hint: '想知道控制台有什么吗？'
    }
  },
  mounted() {
    let url = window.location.href;
    if (url.charAt(url.length - 1) === '/')
      url = url.substring(0, url.length - 1)
    console.log('开始游戏：Navigated to ' + url + '/gate')
  },
  head: {
    title: 'Zoo 游戏简介'
  }
}
</script>
