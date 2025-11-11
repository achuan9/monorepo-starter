import { describe, it, expect } from "vitest"
import { isEmpty, randomString } from "../index"

describe("isEmpty", () => {
  it("should return true for null", () => {
    expect(isEmpty(null)).toBe(true)
  })

  it("should return true for undefined", () => {
    expect(isEmpty(undefined)).toBe(true)
  })

  it("should return true for empty string", () => {
    expect(isEmpty("")).toBe(true)
  })

  it("should return true for empty array", () => {
    expect(isEmpty([])).toBe(true)
  })

  it("should return true for empty object", () => {
    expect(isEmpty({})).toBe(true)
  })

  it("should return false for non-empty string", () => {
    expect(isEmpty("hello")).toBe(false)
  })

  it("should return false for non-empty array", () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  it("should return false for non-empty object", () => {
    expect(isEmpty({ key: "value" })).toBe(false)
  })

  it("should return false for numbers", () => {
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(42)).toBe(false)
  })

  it("should return false for booleans", () => {
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty(true)).toBe(false)
  })
})

describe("randomString", () => {
  it("should generate a string of specified length", () => {
    const result = randomString(10)
    expect(result).toHaveLength(10)
  })

  it("should generate different strings on each call", () => {
    const result1 = randomString(10)
    const result2 = randomString(10)
    // Very unlikely to be the same
    expect(result1).not.toBe(result2)
  })

  it("should use custom character set", () => {
    const result = randomString(10, "0123456789")
    expect(result).toMatch(/^[0-9]+$/)
    expect(result).toHaveLength(10)
  })

  it("should handle empty character set", () => {
    const result = randomString(5, "")
    expect(result).toBe("")
  })

  it("should handle length of 0", () => {
    const result = randomString(0)
    expect(result).toBe("")
  })
})
