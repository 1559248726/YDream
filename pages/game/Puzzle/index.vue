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
              <v-btn
                v-for="(button, i) in buttons"
                :key="i"
                depressed
                elevation="3"
                outlined
              >{{button.text}}</v-btn>
            </div>
            <div class="puzzle-wrapper">
              <div id="puzzle">
                游戏
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
      ]
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

    .menu {
      display: flex;
      flex-direction: column;

      .v-btn {
        margin: 10px auto;
      }
    }

    .puzzle-wrapper {
      flex-grow: 1;

      #puzzle {
        margin: 0 auto;
        width: 500px;
        height: 600px;
        background-color: #7f7f7f;
      }
    }
  }
}


</style>
