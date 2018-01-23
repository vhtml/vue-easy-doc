<template>
  <div :class="['easy-doc-simulator', { 'easy-doc-simulator-fixed': isFixed }]">
    <div class="easy-doc-simulator__nav">
      <div class="easy-doc-simulator__url">{{ iframeHostName }}</div>
      <div class="easy-doc-simulator__reload" @click="reloadIframe"></div>
    </div>
    <iframe ref="iframe" :src="srcWithTimestamp" :style="simulatorStyle" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: 'easy-doc-simulator',

  props: {
    src: String
  },

  data() {
    return {
      scrollTop: window.scrollY,
      iframeHostName: '',
      windowHeight: window.innerHeight
    }
  },

  mounted() {
    this.getScrollTop = () => {
      this.scrollTop = window.scrollY
    }
    this.getWinH = () => {
      this.windowHeight = window.innerHeight
    }
    window.addEventListener('scroll', this.getScrollTop)
    window.addEventListener('resize', this.getWinH)

    const { iframe } = this.$refs
    if (iframe) {
      if (iframe.contentDocument.readyState === 'complete') {
        setTimeout(this.onSrcChanged, 0)
      } else {
        iframe.onload = () => {
          this.onSrcChanged()
          iframe.onload = null
        }
      }
    }
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.getScrollTop)
    window.removeEventListener('resize', this.getWinH)
  },

  watch: {
    src() {
      this.onSrcChanged()
    }
  },

  computed: {
    srcWithTimestamp() {
      const now = `rand=${Date.now()}`
      return this.src + (this.src.indexOf('?') === -1 ? '?' : '&') + now
    },

    isFixed() {
      return this.scrollTop > 60
    },

    simulatorStyle() {
      const height = Math.min(556, this.windowHeight - 150)
      return {
        height: height + 'px'
      }
    }
  },

  methods: {
    reloadIframe() {
      const { iframe } = this.$refs
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.location.reload()
      }
    },
    onSrcChanged() {
      const { iframe } = this.$refs
      if (iframe && iframe.contentWindow) {
        if (this.src.indexOf('://') !== -1) {
          this.iframeHostName = this.src.split('://')[1].split('/')[0]
        } else {
          this.iframeHostName = iframe.contentWindow.location.host || location.host
        }
      }
    }
  }
}
</script>

<style lang="postcss">
@import '../style/variable';

.easy-doc-simulator {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  background: #f2f2f4;
  box-sizing: border-box;
  right: $easy-doc-padding;
  width: $easy-doc-simulator-width;
  min-width: $easy-doc-simulator-width;
  top: calc($easy-doc-padding + $easy-doc-header-top-height);

  @media (max-width: 1400px) {
    width: $easy-doc-simulator-small-width;
    min-width: $easy-doc-simulator-small-width;
  }

  @media (max-width: 1100px) {
    left: 750px;
    right: auto;
  }

  @media (min-width: $easy-doc-row-max-width) {
    right: 50%;
    margin-right: calc(-$easy-doc-row-max-width/2 + 40px);
  }

  &-fixed {
    position: fixed;
    top: $easy-doc-padding;
  }

  iframe {
    width: 100%;
    display: block;
  }

  &__nav {
    background-color: #1b1b1f;
    border-bottom: 1px solid #e5e5e5;

    &::before {
      content: '';
      display: block;
      width: 100%;
      padding-top: calc(40 / 750 * 100%);
      background: url('data:image/png;base64,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') center no-repeat;
      background-size: 100%;
    }
  }

  &__url {
    margin: 5px 10px 10px;
    font-size: 15px;
    background-color: #fff;
    text-align: center;
    line-height: 28px;
    color: #666;
    font-size: 14px;
    font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, sans-serif;

    @media (max-width: 1400px) {
      line-height: 24px;
    }
  }

  &__reload {
    top: 25px;
    right: 10px;
    width: 28px;
    height: 28px;
    cursor: pointer;
    position: absolute;
    background: url('data:image/png;base64,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') center no-repeat;
    background-size: 50%;

    @media (max-width: 1400px) {
      top: 20px;
    }
  }
}
</style>
