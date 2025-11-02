<script setup lang="ts">
import { computed } from 'vue'

// BlogHeading component - displays blog post titles with responsive wrapping
//
// Props:
// - title: The full blog post title (will be split at colon if present)
// - publishDate: Publication date string
// - author: Author name
// - readingTime: Reading time estimate (e.g., "10 minutes")
//
// On mobile (<768px): Subtitle breaks to new line
// On desktop (≥768px): Title and subtitle on same line with colon

const props = withDefaults(defineProps<{
  title: string
  publishDate?: string
  author?: string
  readingTime?: string
}>(), {
  author: 'Benny (Bancs AS)'
})

// Split title at colon for responsive wrapping
const mainTitle = computed(() => {
  const colonIndex = props.title.indexOf(':')
  if (colonIndex === -1) return props.title
  return props.title.substring(0, colonIndex)
})

const subtitle = computed(() => {
  const colonIndex = props.title.indexOf(':')
  if (colonIndex === -1) return null
  return props.title.substring(colonIndex + 1).trim()
})
</script>

<template>
  <div class="blog-heading mb-8">
    <!-- Title with responsive wrapping at colon -->
    <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white border-0! pt-0! mt-0! leading-tight">
      <span v-if="mainTitle">{{ mainTitle }}</span><span
        v-if="subtitle"
        class="block md:inline"
      ><span class="hidden md:inline">: </span><span class="text-slate-700 dark:text-slate-300">{{ subtitle }}</span></span>
    </h1>

    <!-- Metadata -->
    <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
      <span v-if="publishDate"><strong>Published:</strong> {{ publishDate }}</span>
      <span v-if="author"><strong>Author:</strong> {{ author }}</span>
      <span v-if="readingTime"><strong>Reading Time:</strong> {{ readingTime }}</span>
    </div>
  </div>
</template>
