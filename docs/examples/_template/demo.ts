/**
 * Example: [Your Feature Name]
 * Author: [Your Name] (optional)
 * License: MIT
 *
 * [Brief description of what this example demonstrates]
 */

// #region setup
/**
 * Setup code - configuration, imports, types, etc.
 */
export interface Config {
  // Your configuration
}

const config: Config = {
  // Default config
}
// #endregion

// #region basicExample
/**
 * Basic example showing the fundamental concept
 */
export function basicExample() {
  console.log('Replace this with your basic example')

  // Your code here

  return 'result'
}
// #endregion

// #region advancedExample
/**
 * Advanced example showing more complex usage
 */
export class AdvancedExample {
  constructor(private config: Config) {
    // Initialize
  }

  execute() {
    console.log('Replace this with your advanced example')

    // Your code here
  }
}
// #endregion

// Example usage (this will run when executed directly)
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running demo...\n')

  console.log('Basic example:')
  basicExample()

  console.log('\nAdvanced example:')
  const advanced = new AdvancedExample(config)
  advanced.execute()

  console.log('\n✅ Demo complete!')
}
