/**
 * Example: Code Import Demo
 * Author: BANCS
 * License: MIT
 *
 * Demo file showing how code snippets can be imported into blog posts
 */

// #region basicExample
export function greet(name: string): string {
  return `Hello, ${name}!`
}
// #endregion

// #region advancedExample
export interface User {
  id: number
  name: string
  email: string
}

export class UserManager {
  private users: Map<number, User> = new Map()

  addUser(user: User): void {
    this.users.set(user.id, user)
  }

  getUser(id: number): User | undefined {
    return this.users.get(id)
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }
}
// #endregion

// Some code that won't be imported
const internal = "This is internal implementation"

export function helperFunction() {
  // Helper implementation
  return internal
}
