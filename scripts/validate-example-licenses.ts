#!/usr/bin/env node

/**
 * Validates that code examples include proper MIT license headers
 *
 * Ensures all code in docs-internal/examples/ has licensing information,
 * protecting BANCS and contributors.
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const examplesDir = join(rootDir, 'docs-internal', 'examples')

interface ValidationError {
  file: string
  issue: string
}

const errors: ValidationError[] = []
const warnings: string[] = []

// File extensions that should have license headers
const codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.py', '.rs', '.go', '.java']

// Directories to skip
const skipDirs = ['node_modules', '.git', '_template']

function shouldCheckFile(filePath: string): boolean {
  const ext = filePath.substring(filePath.lastIndexOf('.'))
  return codeExtensions.includes(ext)
}

function hasLicenseHeader(content: string): boolean {
  const lower = content.toLowerCase()

  // Check for explicit "License: MIT" in header
  if (lower.includes('license: mit') || lower.includes('license:mit')) {
    return true
  }

  // Check for common MIT license patterns
  if (lower.includes('mit license') && content.substring(0, 500).toLowerCase().includes('license')) {
    return true
  }

  return false
}

function getAllCodeFiles(dir: string): string[] {
  const files: string[] = []

  try {
    const entries = readdirSync(dir)

    for (const entry of entries) {
      const fullPath = join(dir, entry)

      // Skip certain directories
      if (skipDirs.includes(entry)) {
        continue
      }

      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        files.push(...getAllCodeFiles(fullPath))
      } else if (stat.isFile() && shouldCheckFile(entry)) {
        files.push(fullPath)
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }

  return files
}

function validateFile(filePath: string): void {
  try {
    const content = readFileSync(filePath, 'utf-8')

    if (!hasLicenseHeader(content)) {
      errors.push({
        file: relative(rootDir, filePath),
        issue: 'Missing MIT license header. Add a comment at the top with "License: MIT"'
      })
    }
  } catch (error) {
    warnings.push(`Failed to read ${relative(rootDir, filePath)}: ${error}`)
  }
}

// Main validation
console.log('🔍 Validating example licenses...\n')

const codeFiles = getAllCodeFiles(examplesDir)

if (codeFiles.length === 0) {
  console.log('⚠️  No code examples found to validate')
  process.exit(0)
}

console.log(`Found ${codeFiles.length} code file(s) to validate\n`)

for (const file of codeFiles) {
  console.log(`✓ Checking: ${relative(rootDir, file)}`)
  validateFile(file)
}

console.log('')

if (warnings.length > 0) {
  console.log('⚠️  Warnings:\n')
  for (const warning of warnings) {
    console.log(`  ${warning}`)
  }
  console.log('')
}

if (errors.length > 0) {
  console.log('❌ License validation failed!\n')
  console.log('The following files are missing license headers:\n')

  for (const error of errors) {
    console.log(`  ${error.file}`)
    console.log(`    ⚠️  ${error.issue}`)
    console.log('')
  }

  console.log('📖 Add a license header like this:\n')
  console.log('  /**')
  console.log('   * Example: Your Feature')
  console.log('   * Author: Your Name (optional)')
  console.log('   * License: MIT')
  console.log('   */')
  console.log('')
  console.log('📖 See docs-internal/examples/LICENSE for details\n')

  process.exit(1)
} else {
  console.log('✅ All code examples have proper license headers!\n')
  process.exit(0)
}
