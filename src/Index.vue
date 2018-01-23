<template>
<div class="easy-doc">
  <easy-doc-header :config="config.header" active="移动端" />
  <easy-doc-nav :navConfig="config.nav" :base="base" />
  <easy-doc-container :hasSimulator="!!(simulator || simulators.length)">
    <easy-doc-content>
      <slot></slot>
      <easy-doc-navigation :navConfig="config.nav" :base="base" />
    </easy-doc-content>
  </easy-doc-container>
  <easy-doc-simulator v-if="simulator" :src="simulator" />
  <easy-doc-simulator
    v-for="(url, index) in simulators"
    v-show="index === currentSimulator"
    :src="url"
    :key="index"
  />
</div>
</template>

<script>
import TouchEmulator from 'hammer-touchemulator'
import EasyDocHeader from './components/EasyDocHeader'
import EasyDocNav from './components/EasyDocNav'
import EasyDocNavLink from './components/EasyDocNavLink'
import EasyDocContainer from './components/EasyDocContainer'
import EasyDocContent from './components/EasyDocContent'
import EasyDocNavigation from './components/EasyDocNavigation'
import EasyDocSimulator from './components/EasyDocSimulator'

// 启动touch模拟
TouchEmulator()

export default {
  name: 'easy-doc',

  components: {
    EasyDocHeader,
    EasyDocNav,
    EasyDocNavLink,
    EasyDocContainer,
    EasyDocContent,
    EasyDocNavigation,
    EasyDocSimulator
  },

  props: {
    config: {
      type: Object,
      required: true
    },
    currentSimulator: Number,
    simulator: String,
    simulators: {
      type: Array,
      default: () => []
    },
    base: {
      type: String,
      default: '/component'
    }
  }
}
</script>

<style lang="postcss">
@import './style/index.css';
</style>
