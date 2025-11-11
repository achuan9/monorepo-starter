<template>
  <button
    class="vv-button"
    :disabled="props.disabled"
    :class="props.type"
    :size="props.size"
    @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonEmits } from "./button"

defineOptions({
  name: "VvButton"
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "primary",
  size: "medium",
  disabled: false
})

const emit = defineEmits<ButtonEmits>()

const handleClick = () => {
  emit("click")
}
</script>

<style lang="css" scoped>
.vv-button {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>
