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
            <span ref="timer" class="puzzle-timer">{{ !(time.hour / 10 > 1) ? "0" + time.hour + ":" : time.hour + ":"
              }}{{ !(time.minute / 10 > 1) ? "0" + time.minute + ":" : time.minute + ":"
              }}{{ !(time.second / 10 > 1) ? "0" + time.second + "." : time.second + "."
              }}{{ 1 > time.millisecond / 100 ? "0" : "" }}{{ 1 > time.millisecond / 10 ? "0" : ""
              }}{{ time.millisecond }}</span>
          </div>
          <div class="main">
            <v-snackbar
              v-model="snackbar"
            >
              {{ snackbarText }}
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
            <div class="menu">
              <div class="img-wrapper">
                <div class="img">
                  <img src="~/assets/img/puzzle/game-puzzle-1.jpg" alt="">
                  <div
                    v-show="chooseImgWrapper.display"
                    class="choose-img-wrapper"
                    :style="{'left': 'calc(100% / '+column+'*'+chooseImgWrapper.x+')', 'top': 'calc(100% / '+row+'*'+chooseImgWrapper.y+')', 'width': 'calc(100% / '+column+')', 'height': 'calc(100% / '+row+')'}"
                  >
                  </div>
                </div>
              </div>
              <div class="btn-group">
                <v-btn
                  depressed
                  elevation="3"
                  outlined
                  disabled
                >选择难度
                </v-btn>
                <v-btn
                  v-if="!isStart"
                  depressed
                  elevation="3"
                  outlined
                  @click="start"
                >开始游戏
                </v-btn>
                <v-btn
                  v-else
                  depressed
                  elevation="3"
                  outlined
                  @click="cancel"
                >取消游戏
                </v-btn>
              </div>
            </div>
            <div class="puzzle-wrapper">
              <div id="puzzle">
                <img
                  v-for="(img, i) in imgs"
                  :key="i"
                  :src="require(`~/assets/img/puzzle/game-puzzle-1_${img}.png`)"
                  alt=""
                  :style="{cursor: img!==null && flag?'pointer':'not-allowed'}"
                  @click="img!==null && flag?imgChoose($event,i):''"
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
      flag: true,
      row: 4,
      column: 3,
      isStart: false,
      snackbar: false,
      snackbarText: "",
      blankImg: null,
      chooseImgWrapper: {
        x: 0,
        y: 0,
        display: false
      },
      imgs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      setTime: 0,
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      },
      timerInt: 0
    };
  },
  mounted() {
    const userAgent = navigator.userAgent;
    !userAgent.includes("iPhone") && !userAgent.includes("Android") ? this.setTime = 0 : this.setTime = 100;
  },
  methods: {
    start() {
      this.snackbar = true;
      this.snackbarText = "请任意点击一块图片，开始游戏！";
      this.isStart = true;
    },
    end() {
      window.clearInterval(this.timerInt);
      this.time.hour = 0;
      this.time.minute = 0;
      this.time.second = 0;
      this.time.millisecond = 0;
      this.blankImg = null;
      this.chooseImgWrapper.x = 0;
      this.chooseImgWrapper.y = 0;
      this.chooseImgWrapper.display = false;
      this.flag = true;
      for (let i = 0; i < this.imgs.length; i++) {
        this.$set(this.imgs, i, i);
      }
      this.isStart = false;
    },
    cancel() {
      this.end();
      this.snackbar = true;
      this.snackbarText = "游戏已取消！";
    },
    imgChoose(e, i) {
      if (this.isStart) {
        if (this.blankImg === null) {
          this.puzzleStart(e, i);
        } else {
          this.puzzleMove(e, i);
        }
      } else {
        this.snackbar = true;
        this.snackbarText = "点击 ”开始游戏“ ！";
      }
    },
    puzzleStart(e, i) {
      const img = this.imgs;
      this.blankImg = i;
      this.$set(this.imgs, i, null);
      this.chooseImgWrapper.x = i%this.column;
      this.chooseImgWrapper.y = Math.floor(i/this.column);
      this.chooseImgWrapper.display = true;
      img[this.blankImg] = null;
      const upset = this.puzzleUpset(img);
      this.blankImg = upset.blankImg;
      for (let i = 0; i < img.length; i++) {
        this.$set(this.imgs, i, upset.img[i]);
      }
      this.timerInt = setInterval(this.puzzleTimer, 50);
    },
    puzzleUpset(img) {
      let blankImg = this.blankImg;
      let sum = 600;
      while (sum--) {
        let up, down, left, right;
        if ((blankImg + 1) % this.column === 1) right = true;
        else if ((blankImg + 1) % this.column === 0) left = true;
        else {
          right = true;
          left = true;
        }
        if (blankImg < this.column) down = true;
        else if (blankImg > this.row * (this.column - 1)) up = true;
        else {
          down = true;
          up = true;
        }
        const a = [];
        if (up) a.push("up");
        if (down) a.push("down");
        if (left) a.push("left");
        if (right) a.push("right");

        const x = Math.round(Math.random() * a.length);
        let change = 0;
        if (a[x] === "up") change = -this.column;
        if (a[x] === "down") change = this.column;
        if (a[x] === "left") change = -1;
        if (a[x] === "right") change = 1;
        if (change !== 0) {
          const temp = img[blankImg];
          img[blankImg] = img[blankImg + change];
          img[blankImg + change] = temp;
          blankImg += change;
        }
      }
      return { img, blankImg };
    },
    puzzleMove(e, i) {
      let up, down, left, right;
      if ((this.blankImg + 1) % this.column === 1) right = true;
      else if ((this.blankImg + 1) % this.column === 0) left = true;
      else {
        right = true;
        left = true;
      }
      if (this.blankImg < this.column) down = true;
      else if (this.blankImg > this.row * (this.column - 1)) up = true;
      else {
        down = true;
        up = true;
      }
      let transform, change;
      if (up && this.blankImg - this.column === i) {
        transform = "translateY(" + e.target.width + "px)";
        change = i + this.column;
      }
      if (down && this.blankImg + this.column === i) {
        transform = "translateY(-" + e.target.width + "px)";
        change = i - this.column;
      }
      if (left && this.blankImg - 1 === i) {
        transform = "translateX(" + e.target.width + "px)";
        change = i + 1;
      }
      if (right && this.blankImg + 1 === i) {
        transform = "translateX(-" + e.target.width + "px)";
        change = i - 1;
      }
      if (transform) {
        e.target.style.zIndex = 100;
        e.target.style.transform = transform;
        this.flag = false;
        setTimeout(() => {
          e.target.style.transition = "none";
          this.$set(this.imgs, change, this.imgs[i]);
          this.blankImg = i;
          setTimeout(() => {
            this.$set(this.imgs, i, null);
            e.target.style.transform = "translateX(0)";
            e.target.style.zIndex = -10;
            this.flag = true;
            let flag = 0;
            for (let i = 0; i < this.imgs.length; i++) {
              if (this.imgs[i] !== i) flag++;
            }
            if (flag === 1) this.puzzleEnd();
            setTimeout(() => {
              e.target.style.transition = "all 200ms";
              e.target.style.zIndex = 1;
            }, 20);
          }, this.setTime);
        }, 200);
      }
    },
    puzzleEnd() {
      this.end();
      alert('恭喜完成游戏！时间为'+this.$refs.timer.textContent+'。');
    },
    puzzleTimer() {
      this.time.millisecond += 50;
      if (this.time.millisecond >= 1000) {
        this.time.millisecond = 0;
        this.time.second += 1;
      }
      if (this.time.second >= 60) {
        this.time.second = 0;
        this.time.minute += 1;
      }
      if (this.time.minute >= 60) {
        this.time.minute = 0;
        this.time.hour += 1;
      }
      if (this.time.hour >= 24) window.clearInterval(this.timerInt);
    }
  },
  head: {
    titleTemplate: "%s • Y Dream 的游戏",
    title: "Puzzle",
    meta: [
      { hid: "description", name: "description", content: "Puzzle" },
      { name: "keywords", content: "拼图游戏" }
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
      line-height: 40px;
    }

    .puzzle-timer {
      line-height: 40px;
      color: $ultimate-gray;
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

        .img {
          width: 160px;
          height: 220px;
          margin: 0 auto;
          @media (max-width: $media-sm) {
            width: 120px;
            height: 160px;
          }
          position: relative;

          img {
            width: 100%;
            height: 100%;
          }

          .choose-img-wrapper {
            position: absolute;
            border: 1px solid $Illuminating;
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

      #puzzle {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        width: 480px;
        height: 640px;
        background-image: url('~assets/img/puzzle/game-puzzle-1_null.png');
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
