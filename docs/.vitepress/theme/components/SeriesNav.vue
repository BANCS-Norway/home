<script setup lang="ts">
interface Props {
  prev?: {
    text: string
    link: string
  }
  next?: {
    text: string
    link: string
  }
}

const props = defineProps<Props>()
</script>

<template>
  <nav class="flex justify-between items-center py-8 border-t-2 border-gray-200 mt-8">
    <div class="flex-1">
      <a
        v-if="prev"
        :href="prev.link"
        class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors no-underline"
      >
        <span class="text-xl">←</span>
        <span>{{ prev.text }}</span>
      </a>
    </div>

    <div class="flex-1 text-right">
      <a
        v-if="next"
        :href="next.link"
        class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors no-underline"
      >
        <span>{{ next.text }}</span>
        <span class="text-xl">→</span>
      </a>
    </div>
  </nav>
</template>
