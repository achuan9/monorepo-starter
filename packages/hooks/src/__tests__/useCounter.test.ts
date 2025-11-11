import { describe, it, expect } from "vitest"
import { useCounter } from "../useCounter"

describe("useCounter", () => {
  it("should initialize with default value 0", () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })

  it("should initialize with custom value", () => {
    const { count } = useCounter(5)
    expect(count.value).toBe(5)
  })

  it("should increment", () => {
    const { count, inc } = useCounter(0)
    inc()
    expect(count.value).toBe(1)
    inc(2)
    expect(count.value).toBe(3)
  })

  it("should decrement", () => {
    const { count, dec } = useCounter(5)
    dec()
    expect(count.value).toBe(4)
    dec(2)
    expect(count.value).toBe(2)
  })

  it("should respect min value", () => {
    const { count, dec } = useCounter(5, { min: 0 })
    dec(10)
    expect(count.value).toBe(0)
  })

  it("should respect max value", () => {
    const { count, inc } = useCounter(5, { max: 10 })
    inc(10)
    expect(count.value).toBe(10)
  })

  it("should set value", () => {
    const { count, set } = useCounter(0)
    set(5)
    expect(count.value).toBe(5)
  })

  it("should reset to initial value", () => {
    const { count, inc, reset } = useCounter(0)
    inc(5)
    expect(count.value).toBe(5)
    reset()
    expect(count.value).toBe(0)
  })
})
