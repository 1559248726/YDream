<template>
  <v-card
    v-if="appeal"
    class="d-flex zoo-hint"
    elevation="2"
    :style="{padding: 15 + 'px', transition: 'width 500ms, opacity 1s ease-in', opacity: opacity}"
    :width="status ? 240 : 70"
  >
    <v-card
      v-if="!status"
      elevation="0"
      class="d-flex justify-center flex-column hint-icon"
      @click="status = !status"
    >
      <v-icon
        class="d-flex align-baseline"
        large
        @click="status = !status"
      >
        mdi-fingerprint
      </v-icon>
      <span
        class="text-center"
        style="font-size: 16px"
      >
        提示
      </span>
    </v-card>
    <span
      v-if="status"
      class="flex-grow-1"
      style="margin: 0 15px 0 5px"
    >
      {{hint}}
    </span>
    <v-icon
      v-if="status"
      class="d-flex align-baseline"
      @click="status = !status"
    >
      mdi-close
    </v-icon>
  </v-card>
</template>

<script>
export default {
  name: 'ZooHint',
  props: {
    hint: {
      type: String,
      default() {
        return '无提示'
      }
    }
  },
  data() {
    return {
      status: false,
      appeal: false,
      opacity: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.appeal = true
      setTimeout(() => {
        this.opacity = 1
      }, 0)
    }, 11000)
  }
}
</script>

<style scoped lang="scss">
  .zoo-hint {
    position: fixed;
    top: 30px;
    right: 30px;
  }

  .hint-icon {
    width: inherit;
    transition: color 300ms;

    .v-icon::before {
      transition: color 300ms;
    }

    &:hover {
      color: $game-zoo-blue;

      .v-icon::before {
        color: $game-zoo-blue;
      }
    }
  }

  .v-icon {
    &::after {
      background-color: transparent;
    }

    &:hover::before {
      color: $game-zoo-blue;
    }
  }
</style>
