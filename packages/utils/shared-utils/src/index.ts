/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 *
 * @param value - The value to check
 * @returns True if the value is empty
 *
 * @example
 * ```ts
 * isEmpty(null) // => true
 * isEmpty('') // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * isEmpty('hello') // => false
 * isEmpty([1, 2, 3]) // => false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true
  }

  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0
  }

  return false
}

/**
 * Generates a random string of specified length
 *
 * @param length - The length of the random string
 * @param chars - The character set to use (default: alphanumeric)
 * @returns A random string
 *
 * @example
 * ```ts
 * randomString(8)
 * // => 'aB3dE5fG'
 *
 * randomString(10, '0123456789')
 * // => '1234567890'
 * ```
 */
export function randomString(
  length: number,
  chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
