<template>
  <div class="bg-linear-to-br from-slate-900 to-indigo-950 py-16 mt-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-white border-0! pt-0! mt-0!">{{ heading }}</h2>

      <p class="text-slate-300">{{ description }}</p>

      <div class="mt-8">
        <CustomButton
          :href="buttonHref"
          :text="buttonText"
          :aria-label="buttonAriaLabel"
          :title="buttonTitle"
          :rel="buttonRel"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    heading: string
    description: string
    buttonHref?: string
    buttonText?: string
    buttonAriaLabel?: string
    buttonTitle?: string
  }>(),
  {
    buttonHref: 'mailto:contact@bancs.no',
    buttonText: 'Contact Us'
  }
)

// Set rel attribute for regular links, but not for mailto links
const buttonRel = computed(() => {
  return props.buttonHref.startsWith('mailto:') ? undefined : 'noopener'
})
</script>
