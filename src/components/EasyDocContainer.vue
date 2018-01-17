<template>
  <div class="easy-doc-container easy-doc-row" :class="{ 'easy-doc-container--with-simulator': hasSimulator }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hasSimulator: Boolean
  }
}
</script>

<style lang="postcss">
@import '../style/variable';

.easy-doc-container {
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
  padding-left: 250px;

  &--with-simulator {
    padding-right: calc($easy-doc-simulator-width + $easy-doc-padding);

    @media (max-width: 1300px) {
      padding-right: calc($easy-doc-simulator-small-width + $easy-doc-padding);
    }
  }
}
</style>
