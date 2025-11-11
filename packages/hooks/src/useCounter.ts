import { ref } from "vue"

/**
 * 计数器的 composable
 * @param initialValue 初始值，默认为 0
 * @param min 最小值
 * @param max 最大值
 * @returns 返回一个包含当前值和操作函数的对象
 *
 * @example
 * ```ts
 * const { count, inc, dec, set, reset } = useCounter(0, { min: 0, max: 10 })
 * ```
 */
export interface UseCounterOptions {
  min?: number
  max?: number
}

export function useCounter(initialValue = 0, options: UseCounterOptions = {}) {
  const { min, max } = options
  const count = ref(initialValue)

  const inc = (delta = 1) => {
    const newValue = count.value + delta
    if (max !== undefined && newValue > max) {
      count.value = max
      return
    }
    count.value = newValue
  }

  const dec = (delta = 1) => {
    const newValue = count.value - delta
    if (min !== undefined && newValue < min) {
      count.value = min
      return
    }
    count.value = newValue
  }

  const set = (value: number) => {
    let newValue = value
    if (min !== undefined && newValue < min) {
      newValue = min
    }
    if (max !== undefined && newValue > max) {
      newValue = max
    }
    count.value = newValue
  }

  const reset = () => {
    count.value = initialValue
  }

  return {
    count,
    inc,
    dec,
    set,
    reset
  }
}
