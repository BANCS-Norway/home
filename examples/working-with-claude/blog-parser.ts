/**
 * Blog Post Parser
 *
 * A TypeScript utility for parsing markdown blog posts
 * and extracting metadata.
 */

// Type definitions
interface BlogPost {
  title: string
  date: string
  author: string
  content: string
  tags: string[]
  readingTime?: number
}

interface FrontMatter {
  title?: string
  date?: string
  author?: string
  tags?: string[]
  [key: string]: any
}

/**
 * Parses frontmatter from markdown content
 *
 * @param markdown - Raw markdown string
 * @returns Parsed frontmatter object
 */
function parseFrontMatter(markdown: string): FrontMatter {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = markdown.match(frontmatterRegex)

  if (!match) {
    return {}
  }

  const frontmatterText = match[1]
  const frontmatter: FrontMatter = {}

  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()

      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim()] = value
          .slice(1, -1)
          .split(',')
          .map(item => item.trim())
      } else {
        frontmatter[key.trim()] = value
      }
    }
  })

  return frontmatter
}

/**
 * Estimates reading time based on word count
 *
 * @param content - Blog post content
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
function calculateReadingTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

/**
 * Validates a blog post object
 *
 * @param post - Blog post to validate
 * @returns true if valid, throws error otherwise
 */
function validateBlogPost(post: BlogPost): boolean {
  if (!post.title || post.title.trim().length === 0) {
    throw new Error('Blog post must have a title')
  }

  if (!post.date || isNaN(Date.parse(post.date))) {
    throw new Error('Blog post must have a valid date')
  }

  if (!post.author || post.author.trim().length === 0) {
    throw new Error('Blog post must have an author')
  }

  if (!post.content || post.content.trim().length === 0) {
    throw new Error('Blog post must have content')
  }

  return true
}

/**
 * Parses a markdown blog post
 *
 * @param markdown - Raw markdown string
 * @returns Parsed blog post object
 */
export function parseBlogPost(markdown: string): BlogPost {
  const frontmatter = parseFrontMatter(markdown)

  // Remove frontmatter from content
  const content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '').trim()

  const post: BlogPost = {
    title: frontmatter.title || 'Untitled',
    date: frontmatter.date || new Date().toISOString(),
    author: frontmatter.author || 'Anonymous',
    content: content,
    tags: frontmatter.tags || [],
    readingTime: calculateReadingTime(content)
  }

  // Validate the post
  validateBlogPost(post)

  return post
}

/**
 * Formats a blog post for display
 *
 * @param post - Blog post object
 * @returns Formatted HTML string
 */
export function formatBlogPost(post: BlogPost): string {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return `
    <article class="blog-post">
      <header>
        <h1>${post.title}</h1>
        <div class="meta">
          <span>By ${post.author}</span>
          <span>${formattedDate}</span>
          ${post.readingTime ? `<span>${post.readingTime} min read</span>` : ''}
        </div>
        ${post.tags.length > 0 ? `
          <div class="tags">
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </header>
      <div class="content">
        ${post.content}
      </div>
    </article>
  `
}

// Example usage
if (require.main === module) {
  const exampleMarkdown = `---
title: My First Blog Post
date: 2024-10-21
author: Benny
tags: [TypeScript, Tutorial]
---

# Introduction

This is my first blog post using the new parser!
`

  const post = parseBlogPost(exampleMarkdown)
  console.log('Parsed post:', post)
  console.log('Formatted HTML:', formatBlogPost(post))
}
