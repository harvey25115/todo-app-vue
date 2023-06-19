<script setup lang="ts">
import { ref } from 'vue'
import TodoList from '@/components/TodoList.vue'
import TodoInput from '@/components/TodoInput.vue'

const todoInput = ref('')
</script>

<template>
  <main>
    <TodoList />
    <TodoInput v-model="todoInput" />
    {{ todoInput }}
  </main>
</template>
