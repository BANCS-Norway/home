<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../posts.data'
import BlogCard from './BlogCard.vue'

// Publish dates are evaluated at runtime in Europe/Oslo so a post dated
// 2026-04-23 appears the moment Oslo rolls over to that day, regardless
// of when the static build ran (the build host is UTC).
function osloDate(d: Date | number): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' })
    .format(new Date(d))
}

const publishedPosts = computed(() => {
  const today = osloDate(Date.now())
  return posts.filter(post => osloDate(post.date.time) <= today)
})
</script>

<template>
  <BlogCard
    v-for="post in publishedPosts"
    :key="post.url"
  >
    <h3 class="mt-0 mb-3">
      <a
        :href="post.url"
        class="text-[var(--vp-c-brand-1)] hover:text-[var(--vp-c-brand-2)] no-underline"
      >{{ post.title }}</a>
    </h3>
    <p class="mb-4 leading-relaxed">
      <strong>Date</strong>: {{ post.date.string }}
    </p>

    <p class="mb-4 leading-relaxed">
      {{ post.description }}
    </p>

    <p
      v-if="post.tags && post.tags.length > 0"
      class="mb-4 leading-relaxed"
    >
      <strong>Topics</strong>: {{ post.tags.join(', ') }}
    </p>

    <p class="mb-0 leading-relaxed">
      <a
        :href="post.url"
        class="text-[var(--vp-c-brand-1)] hover:text-[var(--vp-c-brand-2)] no-underline"
      >Read more →</a>
    </p>
  </BlogCard>
</template>
