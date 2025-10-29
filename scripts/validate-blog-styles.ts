#!/usr/bin/env node

/**
 * Validates that blog posts don't introduce custom typography or styles
 * that could break the site's consistent design.
 *
 * Allowed: Standard markdown, code blocks, VitePress components
 * Not allowed: <style> tags, inline styles, custom CSS classes
 * Exception: docs-internal/examples/ directory can have custom styles
 */

import { readFileSync, readdirSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const blogDir = join(rootDir, 'docs', 'blog')
const examplesDir = join(rootDir, 'docs-internal', 'examples')

interface ValidationError {
  file: string
  line: number
  issue: string
  content: string
}

const errors: ValidationError[] = []

// Patterns that are NOT allowed in blog posts
const forbiddenPatterns = [
  {
    pattern: /<style(?:\s+scoped)?>/gi,
    message: 'Custom <style> tags are not allowed in blog posts. Use the site\'s default styling.'
  },
  {
    pattern: /style\s*=\s*["'][^"']*["']/gi,
    message: 'Inline styles are not allowed. Use markdown or VitePress components.'
  },
  {
    pattern: /class\s*=\s*["'](?!vp-|language-|blog-card|mb-)[^"']*["']/gi,
    message: 'Custom CSS classes are not allowed (except whitelisted ones). Use standard markdown or VitePress components.'
  },
  {
    pattern: /<font\b/gi,
    message: '<font> tags are deprecated and not allowed. Use markdown formatting.'
  },
  {
    pattern: /<center>/gi,
    message: '<center> tags are deprecated and not allowed. Use markdown or CSS.'
  }
]

// Patterns that are allowed (exceptions to the rules above)
const allowedPatterns = [
  /```[\s\S]*?```/g, // Code blocks can contain anything
  /:::[\s\S]*?:::/g, // VitePress containers
  /<style scoped>[\s\S]*?<\/style>/g // Scoped styles at the end of blog posts (VitePress pattern)
]

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = []

  try {
    const entries = readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        files.push(...getAllMarkdownFiles(fullPath))
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }

  return files
}

function validateFile(filePath: string): void {
  const content = readFileSync(filePath, 'utf-8')

  // Create a version of the content with allowed patterns removed
  let cleanedContent = content
  for (const pattern of allowedPatterns) {
    cleanedContent = cleanedContent.replace(pattern, '')
  }

  // Check each forbidden pattern against the cleaned content
  for (const { pattern, message } of forbiddenPatterns) {
    const matches = [...cleanedContent.matchAll(pattern)]

    for (const match of matches) {
      // Find the line number of the match
      const beforeMatch = content.substring(0, match.index)
      const lineNumber = beforeMatch.split('\n').length

      errors.push({
        file: relative(rootDir, filePath),
        line: lineNumber,
        issue: message,
        content: match[0].substring(0, 50) + (match[0].length > 50 ? '...' : '')
      })
    }
  }
}

function isInExamplesDir(filePath: string): boolean {
  return filePath.startsWith(examplesDir)
}

// Main validation
console.log('🔍 Validating blog post styles...\n')

const blogFiles = getAllMarkdownFiles(blogDir)

if (blogFiles.length === 0) {
  console.log('⚠️  No blog posts found to validate')
  process.exit(0)
}

console.log(`Found ${blogFiles.length} blog post(s) to validate\n`)

for (const file of blogFiles) {
  if (isInExamplesDir(file)) {
    console.log(`⏭️  Skipping: ${relative(rootDir, file)} (in examples directory)`)
    continue
  }

  console.log(`✓ Validating: ${relative(rootDir, file)}`)
  validateFile(file)
}

console.log('')

if (errors.length > 0) {
  console.log('❌ Style validation failed!\n')
  console.log('The following issues were found:\n')

  for (const error of errors) {
    console.log(`  ${error.file}:${error.line}`)
    console.log(`    ⚠️  ${error.issue}`)
    console.log(`    Found: ${error.content}`)
    console.log('')
  }

  console.log('📖 See CONTRIBUTING.md for style guidelines')
  console.log('💡 Tip: Use standard markdown formatting instead of custom styles\n')

  process.exit(1)
} else {
  console.log('✅ All blog posts follow the style guidelines!\n')
  process.exit(0)
}
