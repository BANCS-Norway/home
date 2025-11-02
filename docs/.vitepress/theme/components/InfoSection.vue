<script setup lang="ts">
interface Props {
  title: string
  intro: string
  items: string[]
}

defineProps<Props>()
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ intro }}</p>
    <ul>
      <li
        v-for="item in items"
        :key="item"
        v-html="item"
      />
    </ul>
  </div>
</template>
