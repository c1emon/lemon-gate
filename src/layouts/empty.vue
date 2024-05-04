<script setup>
import { getBgColor, getColor, getWDTheme } from '~/composables/theme'
</script>

<template>
  <div class="app">
    <wd-config-provider :theme-vars="getWDTheme()">
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
  color: v-bind(getColor());
  background-color: v-bind(getBgColor());
}
</style>
