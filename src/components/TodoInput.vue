<script setup lang="ts">
// v-model bindings
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    class="input"
    :value="modelValue"
    placeholder="type here"
    required="true"
    @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.input {
  padding: 1rem 0;
  width: 100%;
  font-size: 1rem;
  border: none;
  border-bottom: 0.5rem solid #004675;
  text-align: center;
  background-color: transparent;
}
.input:focus {
  background-color: white;
}
</style>
