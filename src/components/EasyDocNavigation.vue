<template>
  <div class="easy-doc-navigation">
    <div
      v-if="nav.left"
      class="easy-doc-navigation__link easy-doc-navigation__left"
      @click="handleNavClick('prev')">
      <div class="easy-doc-navigation__arrow-left"></div>
      <span>{{ nav.left.title }}</span>
    </div>
    <div
      v-if="nav.right"
      class="easy-doc-navigation__link easy-doc-navigation__right"
      @click="handleNavClick('next')">
      <span>{{ nav.right.title }}</span>
      <div class="easy-doc-navigation__arrow-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    base: String,
    navConfig: Array
  },

  created() {
    this.keyboardHandler()
  },

  beforeDestroy() {
    this.cancelKeyboardHandler()
  },

  computed: {
    navList() {
      const navList = []
      const navConf = JSON.parse(JSON.stringify(this.navConfig))
      for (let i = 0; i < navConf.length; i++) {
        const navItem = navConf[i]
        if (!navItem.groups) {
          navList.push(navConf[i])
        } else {
          for (let j = 0; j < navItem.groups.length; j++) {
            navList.push(...navItem.groups[j].list)
          }
        }
      }
      return navList
    },
    nav() {
      let currentIndex

      let currentPath = '/' + this.$route.path.split('/').pop()

      for (let i = 0, len = this.navList.length; i < len; i++) {
        if (this.navList[i].path === currentPath) {
          currentIndex = i
          break
        }
      }
      return {
        left: this.navList[currentIndex - 1],
        right: this.navList[currentIndex + 1]
      }
    }
  },

  methods: {
    handleNavClick(direction) {
      const nav = direction === 'prev' ? this.nav.left : this.nav.right
      if (nav.path) {
        this.$router.push(this.base + nav.path)
      } else if (nav.link) {
        window.location.href = nav.link
      }
    },
    keyboardHandler() {
      this.eventHandler = (event) => {
        switch (event.keyCode) {
          case 37: // left
            this.handleNavClick('prev')
            break
          case 39: // right
            this.handleNavClick('next')
            break
        }
      }
      window.addEventListener('keyup', this.eventHandler)
    },
    cancelKeyboardHandler() {
      window.removeEventListener('keyup', this.eventHandler)
    }
  }
}
</script>

<style lang="postcss">
@import '../style/variable';

.easy-doc-navigation {
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 24px 45px;
  position: absolute;

  &__link {
    flex: 1;
    font-size: 14px;
    line-height: 1.5;
    cursor: pointer;
    opacity: .7;
    color: $easy-doc-code-color;
    transition: .3s;

    &:hover {
      opacity: 1;
      color: $easy-doc-blue;
    }

    .easy-icon {
      font-size: 12px;
      line-height: 16px;
    }

    span {
      vertical-align: middle;
    }
  }

  &__left,
  &__right {
    padding: 0 15px;
    position: relative;
  }

  &__right {
    text-align: right;
  }

  &__arrow-left,
  &__arrow-right {
    top: 50%;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    position: absolute;
    border: solid currentColor;
    border-width: 0 1px 1px 0;
  }

  &__arrow-left {
    left: 0;
    transform: rotate(135deg);
  }

  &__arrow-right {
    right: 0;
    transform: rotate(-45deg);
  }
}
</style>
