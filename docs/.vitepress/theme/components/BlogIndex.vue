<script setup lang="ts">
import { data as posts } from '../posts.data'
import BlogCard from './BlogCard.vue'

// Filter to only show published posts (date <= today)
const publishedPosts = posts.filter(post => post.isPublished)
</script>

<template>
  <BlogCard v-for="post in publishedPosts" :key="post.url">
    <h3 class="mt-0 mb-3">
      <a :href="post.url" class="text-[var(--vp-c-brand-1)] hover:text-[var(--vp-c-brand-2)] no-underline">{{ post.title }}</a>
    </h3>
    <p class="mb-4 leading-relaxed"><strong>Date</strong>: {{ post.date.string }}</p>

    <p class="mb-4 leading-relaxed">{{ post.description }}</p>

    <p v-if="post.tags && post.tags.length > 0" class="mb-4 leading-relaxed">
      <strong>Topics</strong>: {{ post.tags.join(', ') }}
    </p>

    <p class="mb-0 leading-relaxed">
      <a :href="post.url" class="text-[var(--vp-c-brand-1)] hover:text-[var(--vp-c-brand-2)] no-underline">Read more →</a>
    </p>
  </BlogCard>
</template>
