<script setup lang="ts">
// DisclaimerBox component - reusable disclaimer box for blog posts
// Uses Tailwind CSS utilities for consistent styling
// Supports light/dark mode automatically
//
// Props:
// - type: 'claude' for default Claude disclaimer text, or omit to use custom text via slot
//
// The "Disclaimer:" label is always shown, only the content is customizable

defineProps<{
  type?: 'claude' | 'custom';
}>();
</script>

<template>
  <div
    class="my-6 p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/50 dark:border-blue-400 dark:shadow-lg dark:shadow-blue-500/10"
  >
    <div class="flex items-start gap-3">
      <p class="m-0">
        <span class="text-blue-600 dark:text-blue-400 text-xl shrink-0">ℹ️</span>
      </p>
      <div class="text-sm text-blue-900 dark:text-blue-50 leading-relaxed">
        <p class="m-0">
          <strong>Disclaimer:</strong>
          <slot>
            <!-- Default Claude disclaimer text if no content provided -->
            <span v-if="type === 'claude'">
              I am not affiliated with, employed by, or sponsored by Anthropic.
              I am a paying Claude Pro subscriber and receive no compensation or
              endorsement for mentioning Claude in this article. All opinions
              and experiences shared are my own.
            </span>
          </slot>
        </p>
      </div>
    </div>
  </div>
</template>
