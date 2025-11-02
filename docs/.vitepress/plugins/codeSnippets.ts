/**
 * VitePress plugin to import code snippets from repository files
 *
 * Usage in markdown:
 * <<< @/path/to/file.ts
 * <<< @/path/to/file.ts{5-10}  // Lines 5-10
 * <<< @/path/to/file.ts#region  // Named region
 *
 * For external GitHub files:
 * [import](https://github.com/owner/repo/blob/main/path/to/file.ts)
 */

import type { Plugin } from 'vite'
import { readFileSync } from 'fs'
import { resolve } from 'path'

interface CodeSnippetOptions {
  root?: string
}

export function codeSnippetsPlugin(options: CodeSnippetOptions = {}): Plugin {
  const root = options.root || process.cwd()

  return {
    name: 'vitepress-code-snippets',

    transform(code: string, id: string) {
      // Only process markdown files
      if (!id.endsWith('.md')) {
        return null
      }

      // Process <<< @/path syntax
      const snippetPattern = /<<<\s+@\/([^\s{#]+)(?:{([\d-,]+)})?(?:#(\w+))?/g

      let transformed = code
      let match

      while ((match = snippetPattern.exec(code)) !== null) {
        const [fullMatch, filePath, lineRange, regionName] = match

        try {
          const resolvedPath = resolve(root, filePath)
          const fileContent = readFileSync(resolvedPath, 'utf-8')

          let snippet = fileContent

          // Extract line range if specified
          if (lineRange) {
            snippet = extractLineRange(fileContent, lineRange)
          }

          // Extract named region if specified
          if (regionName) {
            snippet = extractRegion(fileContent, regionName)
          }

          // Detect language from file extension
          const lang = detectLanguage(filePath)

          // Replace with proper markdown code block
          const codeBlock = `\`\`\`${lang}\n${snippet}\n\`\`\``
          transformed = transformed.replace(fullMatch, codeBlock)
        } catch (error) {
          console.warn(`Failed to load snippet from ${filePath}:`, error)
        }
      }

      return {
        code: transformed,
        map: null
      }
    }
  }
}

function extractLineRange(content: string, range: string): string {
  const lines = content.split('\n')
  const ranges = range.split(',')
  const selectedLines: string[] = []

  for (const r of ranges) {
    if (r.includes('-')) {
      const [start, end] = r.split('-').map(n => parseInt(n.trim(), 10))
      selectedLines.push(...lines.slice(start - 1, end))
    } else {
      const lineNum = parseInt(r.trim(), 10)
      selectedLines.push(lines[lineNum - 1])
    }
  }

  return selectedLines.join('\n')
}

function extractRegion(content: string, regionName: string): string {
  const lines = content.split('\n')
  const startPattern = new RegExp(`#region ${regionName}|// region ${regionName}`, 'i')
  const endPattern = /#endregion|\/\/ endregion/i

  let inRegion = false
  const regionLines: string[] = []

  for (const line of lines) {
    if (startPattern.test(line)) {
      inRegion = true
      continue
    }
    if (endPattern.test(line) && inRegion) {
      break
    }
    if (inRegion) {
      regionLines.push(line)
    }
  }

  return regionLines.join('\n')
}

function detectLanguage(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase() || ''

  const langMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    vue: 'vue',
    py: 'python',
    rs: 'rust',
    go: 'go',
    java: 'java',
    rb: 'ruby',
    php: 'php',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    yaml: 'yaml',
    yml: 'yaml',
    json: 'json',
    md: 'markdown',
    css: 'css',
    scss: 'scss',
    html: 'html',
    xml: 'xml',
    sql: 'sql',
  }

  return langMap[ext] || ext
}
