<template>
  <easy-doc :simulators="simulators" :current-simulator="currentSimulator" :config="config" :base="base">
    <router-view />
  </easy-doc>
</template>

<script>
import EasyDoc from 'src'
import docConfig from './doc.config'

const lang = 'zh-CN'

export default {
  components: { EasyDoc },

  data() {
    return {
      simulators: [`/vue/examples${location.hash}`],
      demoURL: ''
    }
  },

  computed: {
    base() {
      return `/${lang}/component`
    },

    config() {
      return docConfig[lang]
    },

    currentSimulator() {
      const { name } = this.$route
      return name && name.indexOf('demo') !== -1 ? 1 : 0
    }
  }
}
</script>

<style lang="postcss">

</style>
