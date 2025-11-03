/**
 * Blog Posts Data Loader
 *
 * Uses VitePress createContentLoader to automatically discover and load
 * blog posts at build time. This eliminates the need for manual index
 * maintenance and ensures consistency between frontmatter and display.
 */

import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  description: string
  tags: string[]
  excerpt?: string
  isPublished: boolean  // For date-based progressive disclosure
}

/**
 * Formats a date string into a structured date object
 * @param raw - Date string from frontmatter (YYYY-MM-DD)
 * @returns Object with timestamp and formatted string
 */
function formatDate(raw: string): { time: number; string: string } {
  const date = new Date(raw)
  // Set to noon UTC to avoid timezone issues
  date.setUTCHours(12)

  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

/**
 * Checks if a post should be visible based on publication date
 * @param dateString - Date from frontmatter (YYYY-MM-DD)
 * @returns true if post should be visible (date <= today)
 */
function isPublished(dateString: string): boolean {
  const postDate = new Date(dateString)
  const today = new Date()
  // Set both to start of day for fair comparison
  postDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  return postDate <= today
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/*.md', {
  excerpt: true,  // Extract excerpt from content
  transform(raw): Post[] {
    const posts = raw
      // Only include posts with a valid date in frontmatter
      .filter(({ frontmatter }) => frontmatter.date)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        description: frontmatter.description || '',
        tags: frontmatter.tags || [],
        excerpt,
        isPublished: isPublished(frontmatter.date)
      }))
      // Sort by date, newest first
      .sort((a, b) => b.date.time - a.date.time)

    return posts
  }
})
