<template>
  <input
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :class="['vv-input', props.size]"
  />
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import type { InputProps } from "./input";

const props = withDefaults(defineProps<InputProps>(), {
  size: "medium",
  disabled: false,
  placeholder: "",
});
</script>

<style lang="css" scoped>
.vv-input {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>