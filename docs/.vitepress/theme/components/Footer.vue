<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { version } from '../../../../package.json'
</script>

<template>
  <footer class="border-t border-(--vp-c-divider) py-4 mt-8">
    <div class="max-w-6xl mx-auto px-6 text-center text-sm text-(--vp-c-text-2)">
      <div class="mb-2 sm:mb-3">
        <a
          href="/privacy"
          class="text-(--vp-c-brand) underline hover:no-underline"
        >Privacy Policy</a>
        <span class="mx-2">·</span>
        <a
          href="/terms"
          class="text-(--vp-c-brand) underline hover:no-underline"
        >Terms of Use</a>
      </div>
      <div class="mb-2 sm:leading-relaxed">
        <a
          href="/about"
          class="text-(--vp-c-brand) underline hover:no-underline"
        >BANCS AS</a> · Org.nr: 927 177 579 · Allegaten 6, 4400 Flekkefjord ·
        <a
          href="mailto:contact@bancs.no"
          class="text-(--vp-c-brand) underline hover:no-underline"
        >contact@bancs.no</a>
      </div>
      <div class="mb-1 text-xs text-(--vp-c-text-3)">
        Built with VitePress and Tailwind CSS · <a
          href="https://github.com/BANCS-Norway/home/blob/main/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
          class="text-(--vp-c-brand) underline hover:no-underline"
        >{{ version }}</a> · Developed with Claude by Anthropic
      </div>
      <div class="text-xs text-(--vp-c-text-3)">
        Copyright © {{ new Date().getFullYear() }} BANCS AS
      </div>
    </div>
  </footer>
</template>

