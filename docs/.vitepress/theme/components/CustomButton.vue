<template>
  <a
    :href="href"
    class="inline-flex items-center px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-purple-400 to-pink-400 text-slate-900 no-underline border-2 border-purple-400/30 shadow-lg shadow-purple-400/40 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/60 hover:from-purple-300 hover:to-pink-300"
  >
    {{ text }}
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  text: string
}>()
</script>
