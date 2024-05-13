<script setup>
import { useTheme } from '~/composables/theme'

const { wotVars, color, bgColor } = useTheme()
</script>

<template>
  <div class="app">
    <wd-config-provider :theme-vars="wotVars">
      <wd-notify />
      <wd-toast />
      <main font-sans text="center">
        <slot />
      </main>
    </wd-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.app {
  color: v-bind(color);
  background-color: v-bind(bgColor);
}
</style>
