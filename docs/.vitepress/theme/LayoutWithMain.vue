<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'

// Add main landmark to VPContent for accessibility
onMounted(() => {
  const vpContent = document.getElementById('VPContent')
  if (vpContent) {
    vpContent.setAttribute('role', 'main')
  }
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #not-found>
      <slot name="not-found" />
    </template>
    <template #layout-bottom>
      <slot name="layout-bottom" />
    </template>
  </DefaultTheme.Layout>
</template>
