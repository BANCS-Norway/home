<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface UpcomingPost {
  number: number
  title: string
  estimated: string
  tags: string[]
}

const posts = ref<UpcomingPost[]>([])
const loading = ref(true)
const error = ref(false)

function parseField(body: string, fieldName: string): string {
  const lines = body.split('\n')
  const headerIndex = lines.findIndex(l => l.trim().toLowerCase().startsWith(`### ${fieldName.toLowerCase()}`))
  if (headerIndex === -1) return ''
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('###')) break
    if (line && line !== '_No response_') return line
  }
  return ''
}

function parseTags(body: string): string[] {
  const raw = parseField(body, 'Tags')
  if (!raw) return []
  return raw.split(',').map(t => t.trim()).filter(Boolean)
}

// Returns the last Date of the estimated period, or null if unparseable.
// Formats: "2025-06" (year-month) or "2025-Q2" (quarter)
function estimatedEndDate(estimated: string): Date | null {
  const yearMonth = estimated.match(/^(\d{4})-(\d{2})$/)
  if (yearMonth) {
    const year = parseInt(yearMonth[1])
    const month = parseInt(yearMonth[2]) // 1-based
    // Last day of that month
    return new Date(year, month, 0)
  }
  const quarter = estimated.match(/^(\d{4})-Q([1-4])$/)
  if (quarter) {
    const year = parseInt(quarter[1])
    const endMonth = parseInt(quarter[2]) * 3 // Q1=3, Q2=6, Q3=9, Q4=12
    return new Date(year, endMonth, 0)
  }
  return null
}

function isStale(estimated: string): boolean {
  const end = estimatedEndDate(estimated)
  if (!end) return false // unparseable — show it
  return end < new Date()
}

onMounted(async () => {
  try {
    const res = await fetch(
      'https://api.github.com/repos/BANCS-Norway/home/issues?labels=upcoming-post&state=open&per_page=20'
    )
    if (!res.ok) throw new Error('fetch failed')
    const issues = await res.json()
    posts.value = issues
      .map((issue: { number: number; title: string; body: string }) => ({
        number: issue.number,
        title: issue.title,
        estimated: parseField(issue.body ?? '', 'Estimated'),
        tags: parseTags(issue.body ?? '')
      }))
      .filter((post: UpcomingPost) => !isStale(post.estimated))
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <p
    v-if="loading"
    class="text-[var(--vp-c-text-2)] italic"
  >
    Loading...
  </p>

  <template v-else-if="!error">
    <h2
      id="planned-posts"
      tabindex="-1"
    >
      Planned posts
      <a
        class="header-anchor"
        href="#planned-posts"
        aria-label="Permalink to &quot;Planned posts&quot;"
      /></h2>
    <ul
      v-if="posts.length > 0"
      class="list-none p-0"
    >
      <li
        v-for="post in posts"
        :key="post.number"
        class="mb-4"
      >
        <a
          :href="`/upcoming?issue=${post.number}`"
          class="text-[var(--vp-c-brand-1)] hover:text-[var(--vp-c-brand-2)] font-medium no-underline"
        >{{ post.title }}</a>
        <span
          v-if="post.estimated"
          class="text-[var(--vp-c-text-2)] text-sm ml-2"
        >— {{ post.estimated }}</span>
        <div
          v-if="post.tags.length > 0"
          class="flex flex-wrap gap-1 mt-1"
        >
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)]"
          >{{ tag }}</span>
        </div>
      </li>
    </ul>

    <p
      v-else
      class="text-[var(--vp-c-text-2)] italic"
    >
      Nothing planned yet — watch this space.
    </p>
  </template>
</template>
