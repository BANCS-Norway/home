<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site, theme } = useData()

const link = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? theme.value.logoLink
    : theme.value.logoLink?.link ?? '/'
)

const rel = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.rel
)

const target = computed(() =>
  typeof theme.value.logoLink === 'string'
    ? undefined
    : theme.value.logoLink?.target
)

// Get logo paths - assume WebP is configured, create PNG fallback
const webpSrc = computed(() => {
  if (typeof theme.value.logo === 'string') {
    return theme.value.logo
  }
  if (theme.value.logo && typeof theme.value.logo === 'object' && 'src' in theme.value.logo) {
    return theme.value.logo.src
  }
  return null
})

const pngSrc = computed(() => {
  if (!webpSrc.value) return null
  return webpSrc.value.replace(/\.webp$/i, '.png')
})

const logoAlt = computed(() => {
  if (!theme.value.logo) return site.value.title
  if (typeof theme.value.logo === 'string') return site.value.title
  return theme.value.logo.alt || site.value.title
})
</script>

<template>
  <div class="VPNavBarTitle">
    <a
      class="title"
      :href="link"
      :rel="rel"
      :target="target"
    >
      <picture v-if="theme.logo" class="logo">
        <source :srcset="webpSrc" type="image/webp">
        <img :src="pngSrc" :alt="logoAlt">
      </picture>
      <span v-if="theme.siteTitle" v-html="theme.siteTitle"></span>
      <span v-else-if="theme.siteTitle === undefined">{{ site.title }}</span>
    </a>
  </div>
</template>

<style scoped>
.VPNavBarTitle {
  display: flex;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }
}

.logo {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.logo img {
  height: var(--vp-nav-logo-height);
  width: auto;
}
</style>
