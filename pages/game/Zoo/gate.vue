<template>
  <div
    class="wrapper"
    @click="clickTime++"
  >
    <img
      src="~/assets/img/zoo/game-zoo-1_1.jpg"
      alt=""
      :style="{top: img1.top + '%', left: img1.left + '%'}"
      @mouseover="imgChange(1)"
      @focus="imgChange(1)"
      @click="success(1)"
    >
    <img
      v-if="clickTime >= 5"
      src="~/assets/img/zoo/game-zoo-1_2.jpg"
      alt=""
      :style="{top: img2.top + '%', left: img2.left + '%'}"
      @mouseover="imgChange(2)"
      @focus="imgChange(2)"
      @click="success(2)"
    >
    <div @click="overlayStatus === 0 ? overlay = false : ''">
      <v-overlay
        class="text-center"
        opacity="0.7"
        :absolute="true"
        :value="overlay"
      >
        <div v-if="overlayStatus === 0">
          <p>请点击任意一张图片</p>
          <p>点击图片后即可进入相应系列关卡</p>
          <p>点击空白处开始</p>
        </div>
        <div v-if="overlayStatus === 1">
          <p>恭喜通关 “突然滑稽”</p>
          <p>
            下一关
            <nuxt-link to="/">传送门</nuxt-link>
            在此
          </p>
          <p>奖励线索如下，请妥善保存哦</p>
          <v-btn
            color="success"
            @click="overlayContinue"
          >
            继续闯关
          </v-btn>
        </div>
        <div v-if="overlayStatus === 2">
          <p>恭喜通关 “真是让人摸不着头脑”</p>
          <p>
            下一关
            <nuxt-link to="/">传送门</nuxt-link>
            在此
          </p>
          <p>奖励线索如下，请妥善保存哦</p>
          <v-btn
            color="success"
            @click="overlayContinue"
          >
            继续闯关
          </v-btn>
        </div>
      </v-overlay>
    </div>
    <zoo-hint :hint="hint"></zoo-hint>
  </div>
</template>

<script>
import ZooHint from '../../../components/game/ZooHint'

export default {
  layout: 'game/zoo',
  components: {
    ZooHint
  },
  data() {
    return {
      hint: '打开控制台看看，是不是可以对“事件”做点什么...',
      clickTime: 0,
      img1: {
        top: 50,
        left: 50
      },
      img2: {
        top: 30,
        left: 20
      },
      overlay: true,
      overlayStatus: 0
    }
  },
  mounted() {
    setInterval(() => {
      if (this.clickTime >= 5) {
        this.random('img1', 'top', Math.random() * 80)
        this.random('img1', 'left', Math.random() * 80)
        this.random('img2', 'top', Math.random() * 80)
        this.random('img2', 'left', Math.random() * 80)
      }
    }, 4000)
  },
  methods: {
    imgChange(img) {
      const changeImg = 'img' + img
      this.random(changeImg, 'top', Math.random() * 80)
      this.random(changeImg, 'left', Math.random() * 80)
    },
    random(changeImg, o, r) {
      if (Math.abs(this[changeImg][o] - r) <= 20) {
        r = Math.random() * 80
        this.random(changeImg, o, r)
      } else
        this[changeImg][o] = r
    },
    success(img) {
      this.overlayStatus = img
      this.overlay = true
    },
    overlayContinue() {
      this.overlay = false
      this.overlayStatus = 0
    }
  },
  head: {
    title: '第一关'
  }
}
</script>

<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
  }

  img {
    position: relative;
    transition: all 50ms;
    cursor: pointer;
  }
</style>
