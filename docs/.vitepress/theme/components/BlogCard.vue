<script setup lang="ts">
// BlogCard component - reusable card for blog post listings
// Uses Tailwind CSS utilities with VitePress CSS variables for theming
</script>

<template>
  <div class="p-6 rounded-xl border border-[var(--vp-c-divider)] transition-[transform,box-shadow,border-color] duration-300 cursor-pointer bg-[var(--vp-c-bg-alt)] hover:shadow-xl hover:-translate-y-1 hover:border-[var(--vp-c-brand)] mb-6 will-change-transform">
    <slot />
  </div>
</template>
