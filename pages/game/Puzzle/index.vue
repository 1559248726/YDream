<template>
  <v-app>
    <back-home type="gameCenter"></back-home>
    <v-navigation-drawer
      width="500"
      right
      app
    >
      <p>排行榜</p>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <div class="wrapper">
          <div class="head">
            <h2>拼图游戏</h2>
          </div>
          <div class="main">
            <div class="menu">
              <div class="img-wrapper">
                <img src="/img/puzzle/game-puzzle-1.jpg" alt="">
              </div>
              <div class="btn-group">
                <v-btn
                  v-for="(button, i) in buttons"
                  :key="i"
                  depressed
                  elevation="3"
                  outlined
                >{{button.text}}</v-btn>
              </div>
            </div>
            <div class="puzzle-wrapper">
              <div id="puzzle">
                <img
                  v-for="(img, i) in imgs"
                  :key="i"
                  :src="'/img/puzzle/game-puzzle-1_' + img + '.png'"
                  alt=""
                  :style="{cursor: img===null?'not-allowed':'pointer'}"
                  @click="img===null?'':imgChoose($event,i)"
                >
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BackHome from "../../../components/common/BackHome";

export default {
  layout: "empty",
  components: {
    BackHome
  },
  data() {
    return {
      buttons: [
        {
          text: '选择难度',
        },
        {
          text: '开始游戏',
        }
      ],
      flag: true,
      row: 4,
      column: 3,
      blankImg: null,
      imgs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }
  },
  methods: {
    imgChoose(e, i) {
      if (this.blankImg===null) {
        this.blankImg = i
        this.$set(this.imgs, i, null)
      } else {
        let up, down, left, right
        if ((this.blankImg+1)%this.column === 1) {
          right = true
        } else if ((this.blankImg+1)%this.column === 0) {
          left = true
        } else {
          right = true
          left = true
        }
        if (this.blankImg < this.column) {
          down = true
        } else if (this.blankImg > this.row * (this.column-1)) {
          up = true
        } else {
          down = true
          up = true
        }
        let transform, change
        if(up && this.blankImg-3 === i) {
          transform = 'translateY(' + e.target.width + 'px)'
          change = i+3
        }
        if(down && this.blankImg+3 === i) {
          transform = 'translateY(-' + e.target.width + 'px)'
          change = i-3
        }
        if(left && this.blankImg-1 === i) {
          transform = 'translateX(' + e.target.width + 'px)'
          change = i+1
        }
        if(right && this.blankImg+1 === i) {
          transform = 'translateX(-' + e.target.width + 'px)'
          change = i-1
        }
        if (transform) {
          e.target.style.zIndex = 100
          e.target.style.transform = transform
          this.flag = false
          setTimeout(() => {
            e.target.style.transition = "none"
            this.$set(this.imgs, change, this.imgs[i])
            const temp = i
            this.$set(this.imgs, i, null)
            this.blankImg = temp
            e.target.style.transform = "translateX(0)"
            setTimeout(() => {
              e.target.style.transition = "all 200ms"
            }, 20)
            e.target.style.zIndex = 1
            this.flag = true
            let flag = 0
            for (let i = 0; i < this.imgs.length; i++) {
              if (this.imgs[i] !== i) flag++
            }
            if (flag === 1) {
              this.blankImg = null
              for (let i = 0; i < this.imgs.length; i++) {
                this.$set(this.imgs, i, i)
              }
              alert("恭喜完成游戏！")
            }
          }, 180)
        }
      }
    }
  },
  head: {
    titleTemplate: "%s • Y Dream 的游戏",
    meta: [
      { hid: "description", name: "description", content: "前端团队智勇大闯关" },
      { name: "keywords", content: "前端游戏" }
    ]
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  text-align: center;

  .head {
    height: 90px;
    margin-bottom: 10px;
    border-bottom: 1px solid $ultimate-gray;

    h2 {
      line-height: 80px;
    }
  }

  .main {
    display: flex;
    flex-direction: row;
    @media (max-width: $media-xs) {
      flex-direction: column;
    }

    .menu {
      display: flex;
      flex-direction: column;
      width: 300px;
      @media (max-width: $media-xs) {
        width: auto;
        flex-direction: row;
        margin-bottom: 10px;
      }

      .img-wrapper {
        @media (max-width: $media-xs) {
          flex-grow: 1;
        }

        img {
          width: 160px;
          height: 220px;
          margin: 0 auto;
          @media (max-width: $media-sm) {
            width: 120px;
            height: 160px;
          }
        }
      }

      .btn-group {
        display: flex;
        flex-direction: column;
        @media (max-width: $media-xs) {
          flex-grow: 1;
        }

        .v-btn {
          margin: 10px auto;
        }
      }
    }

    .puzzle-wrapper {
      flex-grow: 1;
      @media (max-width: $media-xs) {

      }

      #puzzle {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        width: 480px;
        height: 640px;
        background-image: url("/img/puzzle/game-puzzle-1_null.png");
        background-size: 160px 160px;
        background-repeat: repeat;
        @media (max-width: $media-sm) {
          width: 360px;
          height: 480px;
          background-size: 120px 120px;
        }

        img {
          z-index: 1;
          transition: all 200ms;
          width: 160px;
          height: 160px;
          cursor: pointer;
          @media (max-width: $media-sm) {
            width: 120px;
            height: 120px;
          }
        }
      }
    }
  }
}


</style>
