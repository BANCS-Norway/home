<script setup lang="ts">
interface Props {
  author: string
  authorUrl?: string
  source?: string
  sourceUrl?: string
  license?: string
  licenseUrl?: string
  modifications?: string
}

const props = defineProps<Props>()
</script>

<template>
  <span>
    Photo by
    <a v-if="authorUrl" :href="authorUrl" target="_blank" rel="noopener">{{ author }}</a>
    <span v-else>{{ author }}</span>
    <template v-if="source || sourceUrl">
      on
      <a v-if="sourceUrl" :href="sourceUrl" target="_blank" rel="noopener">{{ source || 'source' }}</a>
      <span v-else>{{ source }}</span>
    </template>
    <template v-if="license">
      <template v-if="licenseUrl">
        , <a :href="licenseUrl" target="_blank" rel="noopener">{{ license }}</a>
      </template>
      <template v-else>
        , {{ license }}
      </template>
    </template>
    <template v-if="modifications">
      , {{ modifications }}
    </template>
  </span>
</template>
