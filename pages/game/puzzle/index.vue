<template>
  <v-app>
    <back-home type="gameCenter"></back-home>
    <v-navigation-drawer
      v-model="drawer"
      width="500"
      right
      app
      bottom
      disable-resize-watcher
    >
      <v-card>
        <v-toolbar
          color="light-blue"
          dark
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="user?ranking=!ranking: ''"
              >
                <v-icon v-if="!user || ranking">mdi-web</v-icon>
                <v-icon v-else>mdi-account</v-icon>
              </v-btn>
            </template>
            <span>{{ user ? "" : "登录后，" }}点击即可切换排行榜</span>
          </v-tooltip>


          <v-toolbar-title>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  style="margin-left: 20px"
                  v-on="on"
                >{{ ranking ? "站 内 排 行 榜" : "个 人 排 行 榜" }}</span>
              </template>
              <span>{{ user ? "" : "登录后，" }}点击左侧图标即可切换排行榜</span>
            </v-tooltip>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="rankRefresh"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>点击即可刷新排行榜</span>
          </v-tooltip>

          <v-btn icon @click="drawer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-subheader v-if="!user || ranking" inset>站内的前十名最快记录（纪录保持者）</v-subheader>
          <v-subheader v-else inset>{{ user.username }}，您最快的前十个记录</v-subheader>
          <v-divider inset></v-divider>
          <v-list-item
            v-for="(item, i) in record"
            :key="i"
          >
            <v-list-item-icon>
              <v-avatar
                color="primary"
                size="30"
              ><span class="white--text">{{ i === 0 ? "一" : ""
                }}{{ i === 1 ? "二" : ""
                }}{{ i === 2 ? "三" : ""
                }}{{ i === 3 ? "四" : ""
                }}{{ i === 4 ? "五" : ""
                }}{{ i === 5 ? "六" : ""
                }}{{ i === 6 ? "七" : ""
                }}{{ i === 7 ? "八" : ""
                }}{{ i === 8 ? "九" : ""
                }}{{ i === 9 ? "十" : ""
                }}</span>
              </v-avatar>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.time"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar width="100" style="justify-content: center;">
              <span v-if="!user || ranking" v-text="item.username"></span>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <div class="wrapper">
          <div class="head">
            <h2>拼图游戏</h2>
            <span ref="timer" class="puzzle-timer">{{ 10 > time.hour ? "0" + time.hour + ":" : time.hour + ":"
              }}{{ 10 > time.minute ? "0" + time.minute + ":" : time.minute + ":"
              }}{{ 10 > time.second ? "0" + time.second + "." : time.second + "."
              }}{{ 100 > time.millisecond ? "0" : "" }}{{ 10 > time.millisecond ? "0" : ""
              }}{{ time.millisecond }}</span>
            <div class="head-right">
              <div class="user">
                <v-dialog
                  v-if="user === null"
                  v-model="dialog"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="login"
                      width="90"
                      depressed
                      small
                      v-bind="attrs"
                      v-on="on"
                    >
                      点击登录
                    </v-btn>
                  </template>
                  <v-card>
                    <validation-observer
                      ref="observer"
                      v-slot="{ invalid }"
                    >
                      <form @submit.prevent="userSubmit">
                        <v-card-title>
                          <span class="headline">{{ !isRegister ? "登录" : "注册" }}</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="用户名"
                                  rules="required|max:10"
                                >
                                  <v-text-field
                                    v-model="username"
                                    :counter="10"
                                    :error-messages="errors"
                                    label="用户名"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                              </v-col>
                              <v-col cols="12">
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="密码"
                                  rules="required|max:10"
                                  vid="password"
                                >
                                  <v-text-field
                                    v-model="password"
                                    :counter="10"
                                    :error-messages="errors"
                                    label="密码"
                                    type="password"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                              </v-col>
                              <v-col
                                v-if="isRegister"
                                cols="12"
                              >
                                <validation-provider
                                  v-slot="{ errors }"
                                  name="确认密码"
                                  rules="required|confirmed:password|max:10"
                                  vid="confirmPassword"
                                >
                                  <v-text-field
                                    v-model="confirmPassword"
                                    :counter="10"
                                    :error-messages="errors"
                                    label="确认密码"
                                    type="password"
                                    required
                                  ></v-text-field>
                                </validation-provider>
                              </v-col>
                              <v-col cols="12">
                                <small>{{ !isRegister ? "无账号" : "已有账号" }}？</small>
                                <a
                                  target="#"
                                  @click="isRegister = !isRegister"
                                >
                                  <small>{{ !isRegister ? "点击注册" : "点击登录" }}</small>
                                </a>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="userClear"
                          >
                            取消
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            type="submit"
                            :disabled="invalid"
                            @click="!isRegister?'userLogin':'userRegister'"
                          >
                            提交
                          </v-btn>
                        </v-card-actions>
                      </form>
                    </validation-observer>
                  </v-card>
                </v-dialog>
                <template v-if="user !== null">
                  <span>尊敬的{{ user.username }}</span>
                  <a @click="userLogout">退出登录</a>
                </template>
              </div>
              <v-btn
                class="rank"
                width="90"
                depressed
                small
                @click.stop="drawer = !drawer"
              >
                排 行 榜
              </v-btn>
            </div>
          </div>
          <div class="main">
            <v-snackbar
              v-model="snackbar"
              centered
              vertical
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
                <div v-if="row === 3" class="img img1">
                  <img
                    class=""
                    src="~/assets/img/puzzle/2/game-puzzle-2.jpg"
                    alt=""
                  >
                  <div
                    v-show="chooseImgWrapper.display"
                    class="choose-img-wrapper"
                    :style="{'left': 'calc(100% / '+column+'*'+chooseImgWrapper.x+')', 'top': 'calc(100% / '+row+'*'+chooseImgWrapper.y+')', 'width': 'calc(100% / '+column+')', 'height': 'calc(100% / '+row+')'}"
                  >
                  </div>
                </div>
                <div v-else class="img img2">
                  <img
                    class="img2"
                    src="~/assets/img/puzzle/1/game-puzzle-1.jpg"
                    alt=""
                  >
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
                  :disabled="isStart"
                  @click="row === 3 ? row = 4 : row = 3"
                >切换难度
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
                  :disabled="auto"
                  @click="cancel"
                >取消游戏
                </v-btn>
                <v-dialog
                  v-model="dialogHelp"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      elevation="3"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      @click="dialogHelp=true"
                    >游戏帮助
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">游戏帮助</v-card-title>
                    <v-card-text>
                      <p style="text-indent: 28px">
                        点击开始游戏并选择点击一块拼图，即可开始游戏！游戏会去除选中的拼图，并打乱其他拼图位置，您需要通过一个空白位置还原其他所有拼图。
                      </p>
                      <p style="text-indent: 28px; margin-bottom: 0">
                        登录账号后，即可选择是否上传完成游戏的用时，上传用时后即可参与排行榜的排名。
                      </p>
                      <p style="text-indent: 28px">
                        排行榜分两种模式，即个人排行榜与站内排行榜，可随时进行切换。
                      </p>
                      <p style="text-indent: 28px; margin-bottom: 0">
                        3*3难度具有自动还原功能，3*4难度可上传游戏用时。
                      </p>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="dialogHelp = false"
                      >
                        确认
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn
                  v-if="row === 3"
                  depressed
                  elevation="3"
                  outlined
                  :disabled="!blankImg || auto"
                  @click="autoFinish"
                >自动完成
                </v-btn>
              </div>
            </div>
            <div class="puzzle-wrapper">
              <div v-if="row === 3" class="puzzle img1">
                <img
                  v-for="(img, i) in imgs1"
                  :id="'img' + i"
                  :key="i"
                  :src="require(`~/assets/img/puzzle/2/game-puzzle-2_${img}.png`)"
                  alt=""
                  :style="{cursor: img !== null && flag && !auto ? 'pointer' : 'not-allowed'}"
                  @click="img !== null && flag ? imgChoose($event,i) : ''"
                >
              </div>
              <div v-else class="puzzle img2">
                <img
                  v-for="(img, i) in imgs2"
                  :key="i"
                  :src="require(`~/assets/img/puzzle/1/game-puzzle-1_${img}.png`)"
                  alt=""
                  :style="{cursor: img!==null && flag?'pointer':'not-allowed'}"
                  @click="img!==null && flag?imgChoose($event,i):''"
                >
              </div>
            </div>
            <v-dialog
              v-model="dialog2"
              persistent
              max-width="290"
            >
              <v-card>
                <v-card-title v-if="row === 4" class="headline">
                  {{ user !== null ? "恭喜完成游戏！" : "是否登录？" }}
                </v-card-title>
                <v-card-title v-else class="headline">
                  恭喜完成游戏！
                </v-card-title>
                <v-card-text>{{ user !== null ? "您的" : "恭喜完成游戏！" }}用时为：{{ dialog2Text }}</v-card-text>
                <div v-if="row === 4">
                  <v-card-text v-if="user !== null">点击上传即可上传记录。</v-card-text>
                  <v-card-text v-else>登录之后可以保存完成游戏的用时记录，并且可以参与网站排行榜。</v-card-text>
                </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="loginCancel"
                  >
                    {{ user !== null ? "关闭" : "取消" }}
                  </v-btn>
                  <v-btn
                    v-if="row === 4"
                    color="green darken-1"
                    text
                    @click="loginConfirm"
                  >
                    {{ user !== null ? "上传" : "登录" }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import PriorityQueue from "priorityqueuejs";
import BackHome from "../../../components/common/BackHome";

export default {
  layout: "empty",
  components: {
    BackHome,
    ValidationObserver
  },
  async asyncData({ $axios }) {
    const recordJson = await $axios.$get("/api/puzzle/record");
    const record = [];
    if (recordJson.message === "success") {
      for (let i = 0; i < recordJson.records.length; i++) {
        let time = String(recordJson.records[i].time);
        let hour = 0;
        let minute = 0;
        let millisecond = time.split(".")[1] ? parseInt(time.split(".")[1]) : 0;
        if (millisecond < 10) {
          millisecond *= 100;
        } else if (millisecond < 100) {
          millisecond *= 10;
        }
        time = parseInt(time.split(".")[0]);
        while (time >= 60 * 60) {
          hour++;
          time -= 60 * 60;
        }
        while (time >= 60) {
          minute++;
          time -= 60;
        }
        while (time >= 60) {
          minute++;
          time -= 60;
        }
        const r = { username: recordJson.records[i].owner ? recordJson.records[i].owner.username : "" };
        r.time = `${hour < 10 ? "0" + hour : hour
        }:${minute < 10 ? "0" + minute : minute
        }:${time < 10 ? "0" + time : time
        }.${millisecond < 100 ? "0" : ""
        }${millisecond < 10 ? "0" : ""
        }${millisecond}`;

        record.push(r);
      }
    }
    const userJson = await $axios.$get("/api/puzzle/user");
    let user;
    if (userJson.message === "success") {
      user = userJson.user;
    } else {
      user = null;
    }
    return { record, user };
  },
  data() {
    return {
      auto: false,
      flag: true,
      row: 3,
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
      imgs1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      imgs2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      setTime: 0,
      time: {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      },
      timerInt: 0,
      drawer: null,
      dialog: false,
      dialog2: false,
      dialog2Text: "",
      dialogHelp: false,
      username: "",
      password: "",
      isRegister: false,
      confirmPassword: "",
      ranking: true,
      rankingIsShow: false
    };
  },
  computed: {},
  watch: {
    ranking() {
      this.rankRefresh();
    }
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
      if (this.row === 3) {
        for (let i = 0; i < this.imgs1.length; i++) {
          this.$set(this.imgs1, i, i + 1);
        }
      } else {
        for (let i = 0; i < this.imgs2.length; i++) {
          this.$set(this.imgs2, i, i);
        }
      }
      this.isStart = false;
    },
    cancel() {
      this.end();
      this.snackbar = true;
      this.snackbarText = "游戏已取消！";
    },
    imgChoose(e, i) {
      this.snackbar = false;
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
      let img
      if (this.row === 3) {
        img = this.imgs1;
        this.$set(this.imgs1, i, null);
      } else {
        img = this.imgs2;
        this.$set(this.imgs2, i, null);
      }
      this.blankImg = i;
      this.chooseImgWrapper.x = i % this.column;
      this.chooseImgWrapper.y = Math.floor(i / this.column);
      this.chooseImgWrapper.display = true;
      img[this.blankImg] = null;
      const upset = this.puzzleUpset(img);
      this.blankImg = upset.blankImg;
      if (this.row === 3) {
        for (let i = 0; i < img.length; i++) {
          this.$set(this.imgs1, i, upset.img[i]);
        }
      } else {
        for (let i = 0; i < img.length; i++) {
          this.$set(this.imgs2, i, upset.img[i]);
        }
      }
      this.timerInt = setInterval(this.puzzleTimer, 50);
    },
    puzzleUpset(img) {
      let blankImg = this.blankImg;
      let sum = 500;
      while (sum--) {
        let up, down, left, right;
        if ((blankImg + 1) % this.column === 1) right = true;
        else if ((blankImg + 1) % this.column === 0) left = true;
        else {
          right = true;
          left = true;
        }
        if (blankImg < this.column) down = true;
        else if (blankImg > this.column * (this.row - 1) - 1) up = true;
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
          if (this.row === 3) {
            this.$set(this.imgs1, change, this.imgs1[i]);
          } else {
            this.$set(this.imgs2, change, this.imgs2[i]);
          }
          this.blankImg = i;
          setTimeout(() => {
            if (this.row === 3) {
              this.$set(this.imgs1, i, null);
            } else {
              this.$set(this.imgs2, i, null);
            }
            e.target.style.transform = "translateX(0)";
            e.target.style.zIndex = -10;
            this.flag = true;
            let flag = 0;
            if (this.row === 3) {
              for (let i = 0; i < this.imgs1.length; i++) {
                if (this.imgs1[i] !== i + 1) flag++;
              }
            } else {
              for (let i = 0; i < this.imgs2.length; i++) {
                if (this.imgs2[i] !== i) flag++;
              }
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
      if (this.auto !== true) {
        this.dialog2Text = this.$refs.timer.textContent;
        this.dialog2 = true;
      }
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
    },
    async recordSubmit() {
      const timeArray = this.dialog2Text.split(":");
      let time = parseFloat(timeArray[2]);
      if (timeArray[0] !== "00") time += parseInt(timeArray[0]) * 60 * 60;
      if (timeArray[1] !== "00") time += parseInt(timeArray[1]) * 60;
      await this.$axios.$post("/api/puzzle/record", { time });
      this.dialog2Text = "";
      this.snackbar = true;
      this.snackbarText = "记录已成功上传！";
    },
    loginCancel() {
      this.dialog2Text = "";
      this.dialog2 = false;
    },
    loginConfirm() {
      this.dialog2 = false;
      if (this.user !== null)
        this.recordSubmit();
      else
        this.dialog = true;
    },
    async userInfo() {
      const userJson = await this.$axios.$get("/api/puzzle/user");
      if (userJson.message === "success") {
        this.user = userJson.user;
      } else {
        this.user = null;
      }
    },
    userSubmit() {
      if (this.isRegister) {
        this.userRegister();
      } else {
        this.userLogin();
      }
    },
    async userLogin() {
      this.$refs.observer.validate();
      const json = await this.$axios.$post("/api/puzzle/login", {
        username: this.username,
        password: this.password
      });
      if (json.message === "success") {
        this.userClear();
        this.snackbar = true;
        if (this.confirmPassword === "") {
          this.snackbarText = "登陆成功！";
        } else {
          this.snackbarText = "注册并登录成功！";
        }
        await this.userInfo();
        if (this.dialog2Text !== "") await this.recordSubmit();
      } else if (this.confirmPassword === "") {
        this.snackbar = true;
        this.snackbarText = "用户名或者密码错误。";
      }
    },
    async userRegister() {
      this.$refs.observer.validate();
      const json = await this.$axios.$post("/api/puzzle/register", {
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
      this.snackbar = true;
      if (json.message === "success") {
        this.snackbarText = "注册成功！";
        await this.userLogin();
      } else if (json.message === "username duplicate") {
        this.snackbarText = "用户名重复，请修改用户名。";
      } else {
        this.snackbarText = "注册失败！";
      }
    },
    userClear() {
      this.dialog = false;
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
      this.isRegister = false;
    },
    async userLogout() {
      const Json = await this.$axios.$post("/api/puzzle/logout");
      if (Json.message === "success") {
        this.user = null;
        this.snackbar = true;
        this.snackbarText = "已退出账号";
        if (!this.ranking) {
          this.ranking = true;
        }
      }
    },
    async rankRefresh() {
      let data = "";
      if (!this.ranking) data = "isUser=true";
      if (data) data = "?" + data;
      const recordJson = await this.$axios.$get("/api/puzzle/record" + data);
      const record = [];
      if (recordJson.message === "success") {
        for (let i = 0; i < recordJson.records.length; i++) {
          let time = String(recordJson.records[i].time);
          let hour = 0;
          let minute = 0;
          let millisecond = time.split(".")[1] ? parseInt(time.split(".")[1]) : 0;
          if (millisecond < 10) {
            millisecond *= 100;
          } else if (millisecond < 100) {
            millisecond *= 10;
          }
          time = parseInt(time.split(".")[0]);
          while (time >= 60 * 60) {
            hour++;
            time -= 60 * 60;
          }
          while (time >= 60) {
            minute++;
            time -= 60;
          }
          while (time >= 60) {
            minute++;
            time -= 60;
          }
          const r = { username: recordJson.records[i].owner ? recordJson.records[i].owner.username : "" };
          r.time = `${hour < 10 ? "0" + hour : hour
          }:${minute < 10 ? "0" + minute : minute
          }:${time < 10 ? "0" + time : time
          }.${millisecond < 100 ? "0" : ""
          }${millisecond < 10 ? "0" : ""
          }${millisecond}`;

          record.push(r);
        }
        this.record = record;
      }
    },
    autoToString(state) {
      let string = ''
      for (let i = 0; i < state.length; i++) {
        string += state[i]
      }
      return string
    },
    autoFun(state) {
      let ans = 0;
      for (let i = 0; i < state.length; i++) {
        if (state[i] !== 'x') {
          const t = state[i] - 1
          ans += Math.abs(Math.floor(i / 3) - Math.floor(t / 3)) + Math.abs(i % 3 - t % 3)
        }
      }
      return ans
    },
    autoFinish() {
      window.clearInterval(this.timerInt);
      this.time.hour = 0;
      this.time.minute = 0;
      this.time.second = 0;
      this.time.millisecond = 0;

      this.auto = true

      const start = []
      for (let i = 0; i < this.imgs1.length; i++) {
        start[i] = this.imgs1[i]
      }
      start[this.blankImg] = 'x'

      let end = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      end[this.chooseImgWrapper.y * 3 + this.chooseImgWrapper.x] = 'x'

      const dis = new Map()
      const pre = new Map()
      const heap = new PriorityQueue((a, b) => {
        return b.dis > a.dis ? 1 : b.dis < a.dis ? -1 : b.state > a.state ? 1 : b.state < a.state ? -1 : 0;
      })

      heap.enq({
        dis: this.autoFun(start),
        state: start
      })
      dis.set(this.autoToString(start), 0)

      const op = [[-1, 0, 1, 0], [0, 1, 0, -1]]
      const ope = ['u', 'r', 'd', 'l']
      while (heap.size()) {

        const t = heap.deq()
        const state = t.state
        if (state.toString() === end.toString())
          break

        const step = dis.get(this.autoToString(state))
        let x, y
        for(let i = 0; i < state.length; i++)
          if(state[i] === 'x') {
            x = Math.floor(i / 3);
            y = i % 3;
            break;
          }

        const source = []
        for (let i = 0; i < state.length; i++) {
          source[i] = state[i]
        }

        for (let i = 0; i < 4; i++)
        {
          const a = x + op[0][i]
          const b = y + op[1][i]
          let temp

          if (a >= 0 && a < 3 && b >= 0 && b < 3) {
            temp = state[x * 3 + y]
            state[x * 3 + y] = state[a * 3 + b]
            state[a * 3 + b] = temp

            const string = this.autoToString(state)
            if (!dis.has(string) || dis.get(string) > step + 1) {
              dis.set(string, step + 1)
              pre.set(string, {
                source,
                ope: ope[i]
              })

              const heapState = []
              for (let i = 0; i < state.length; i++) {
                heapState[i] = state[i]
              }
              heap.enq({
                dis: dis.get(string) + this.autoFun(state),
                state: heapState
              })
            }

            temp = state[x * 3 + y]
            state[x * 3 + y] = state[a * 3 + b]
            state[a * 3 + b] = temp
          }
        }
      }

      let ans = ''
      while (end.toString() !== start.toString()) {
        ans += pre.get(this.autoToString(end)).ope
        end = pre.get(this.autoToString(end)).source
      }
      const result = ans.split('').reverse().join('')

      let i = 0
      const interval = setInterval(() => {
        if (i > result.length) {
          this.auto = false
          clearInterval(interval)
        }

        switch (result[i++]) {
          case 'u':
            document.getElementById("img" + (this.blankImg - 3)).click()
            break
          case 'r':
            document.getElementById("img" + (this.blankImg + 1)).click()
            break
          case 'd':
            document.getElementById("img" + (this.blankImg + 3)).click()
            break
          case 'l':
            document.getElementById("img" + (this.blankImg - 1)).click()
            break
          default:
            break
        }
      },400)
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
    position: relative;
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

    .head-right {
      display: flex;
      flex-direction: column;
      position: absolute;
      align-items: flex-end;
      height: 100%;
      padding: 5px 0;
      top: 0;
      right: 0;

      .rank {
        flex-grow: 1;
      }

      .user {
        flex-grow: 1;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        font-size: 14px;

        span {
          font-size: 12px;
          letter-spacing: 2px;
        }

        a {
          font-size: 10px;
          color: $ultimate-gray;
        }
      }
    }
  }

  .main {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
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
        margin-bottom: 20px;
      }

      .img-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        @media (max-width: $media-xs) {
          flex-grow: 1;
          margin-bottom: 0;
        }

        .img {
          margin: 0 auto;
          position: relative;

          &.img1 {
            width: 160px;
            height: 160px;
            @media (max-width: $media-sm) {
              width: 140px;
              height: 140px;
            }
          }

          &.img2 {
            width: 160px;
            height: 220px;
            @media (max-width: $media-sm) {
              width: 120px;
              height: 160px;
            }
          }

          img {
            width: 100%;
          }

          .choose-img-wrapper {
            position: absolute;
            border: 1px solid $illuminating;
          }
        }
      }

      .btn-group {
        display: flex;
        flex-direction: column;
        @media (max-width: $media-xs) {
          flex-grow: 2;
        }

        .v-btn {
          margin: 10px auto;
        }
      }
    }

    .puzzle-wrapper {
      flex-grow: 1;

      .puzzle {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        background-image: url('~assets/img/puzzle/game-puzzle-null.png');
        background-size: 160px 160px;
        background-repeat: repeat;
        @media (max-width: $media-sm) {
          background-size: 120px 120px;
        }

        &.img1 {
          width: 480px;
          height: 480px;
          @media (max-width: $media-sm) {
            width: 360px;
            height: 360px;
          }
        }

        &.img2 {
          width: 480px;
          height: 640px;
          @media (max-width: $media-sm) {
            width: 360px;
            height: 480px;
          }
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
