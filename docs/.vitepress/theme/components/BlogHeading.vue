<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import HeroImage from './HeroImage.vue'
import ImageAttribution from './ImageAttribution.vue'

// BlogHeading component - displays blog post header with responsive wrapping
//
// Reads all data from frontmatter - no props needed!
//
// Frontmatter schema:
// - title: string (required) - Will be split at colon or hyphen if present
// - subtitle: string (optional) - Explicit subtitle, overrides title splitting
// - description: string (required) - For meta tags
// - date: YYYY-MM-DD (required) - Publication date
// - author: string (optional) - Defaults to "Benny (Bancs AS)"
// - readingTime: number (optional) - Minutes to read, auto-calculated if omitted
// - hero: object (optional) - Hero image configuration
//   - image: string - Path to image
//   - alt: string - Alt text
//   - attribution: object (optional)
//     - author: string
//     - authorUrl: string
//     - source: string
//     - sourceUrl: string
//
// On mobile (<768px): Subtitle breaks to new line
// On desktop (≥768px): Title and subtitle on same line with separator

const { page, frontmatter } = useData()

// Calculate reading time based on content length (if not provided in frontmatter)
const calculatedReadingTime = computed(() => {
  if (frontmatter.value.readingTime) {
    return frontmatter.value.readingTime
  }

  // Average reading speed: 200 words per minute
  const content = page.value.content || ''
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / 200)
  return minutes
})

// Format reading time as string
const readingTimeFormatted = computed(() => {
  const minutes = calculatedReadingTime.value
  return minutes === 1 ? '1 minute' : `${minutes} minutes`
})

// Format date from YYYY-MM-DD to readable format
const formattedDate = computed(() => {
  if (!frontmatter.value.date) return null

  const date = new Date(frontmatter.value.date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Author with default fallback
const author = computed(() => {
  return frontmatter.value.author || 'Benny (Bancs AS)'
})

// Check if content should be blurred based on future date
const isBlurred = computed(() => {
  if (!frontmatter.value.date) return false
  const postDate = new Date(frontmatter.value.date)
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Normalize to start of day
  return postDate > today
})

// Split title at colon or hyphen for responsive wrapping
// Explicit subtitle in frontmatter takes precedence
const mainTitle = computed(() => {
  const title = frontmatter.value.title || ''

  // If explicit subtitle provided, use full title as main
  if (frontmatter.value.subtitle) {
    return title
  }

  // Try splitting at colon first
  const colonIndex = title.indexOf(':')
  if (colonIndex !== -1) {
    return title.substring(0, colonIndex)
  }

  // Try splitting at hyphen (with spaces around it)
  const hyphenIndex = title.indexOf(' - ')
  if (hyphenIndex !== -1) {
    return title.substring(0, hyphenIndex)
  }

  return title
})

const subtitle = computed(() => {
  // Explicit subtitle takes precedence
  if (frontmatter.value.subtitle) {
    return frontmatter.value.subtitle
  }

  const title = frontmatter.value.title || ''

  // Try splitting at colon
  const colonIndex = title.indexOf(':')
  if (colonIndex !== -1) {
    return title.substring(colonIndex + 1).trim()
  }

  // Try splitting at hyphen
  const hyphenIndex = title.indexOf(' - ')
  if (hyphenIndex !== -1) {
    return title.substring(hyphenIndex + 3).trim() // +3 to skip ' - '
  }

  return null
})
</script>

<template>
  <div class="blog-heading">
    <!-- Title with responsive wrapping at colon or hyphen -->
    <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white border-0! pt-0! mt-0! leading-tight mb-4">
      <span v-if="mainTitle">{{ mainTitle }}</span><span
        v-if="subtitle"
        class="block md:inline"
      ><span class="hidden md:inline">: </span><span class="text-slate-700 dark:text-slate-300">{{ subtitle }}</span></span>
    </h1>

    <!-- Metadata -->
    <div class="mb-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
      <span v-if="formattedDate"><strong>Published:</strong> {{ formattedDate }}</span>
      <span v-if="author"><strong>Author:</strong> {{ author }}</span>
      <span v-if="readingTimeFormatted"><strong>Reading Time:</strong> {{ readingTimeFormatted }}</span>
    </div>

    <!-- Hero Image (if provided in frontmatter) -->
    <HeroImage
      v-if="frontmatter.hero"
      :src="frontmatter.hero.image"
      :alt="frontmatter.hero.alt"
      :blurred="isBlurred"
    >
      <!-- Image Attribution (if provided) -->
      <ImageAttribution
        v-if="frontmatter.hero.attribution"
        :author="frontmatter.hero.attribution.author"
        :author-url="frontmatter.hero.attribution.authorUrl"
        :source="frontmatter.hero.attribution.source"
        :source-url="frontmatter.hero.attribution.sourceUrl"
      />
    </HeroImage>
  </div>
</template>
