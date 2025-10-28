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
  <DefaultTheme.Layout />
</template>
