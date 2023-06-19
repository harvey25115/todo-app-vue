<script setup lang="ts">
import TodoItem from './TodoItem.vue'

const todos = [{ id: 1, content: 'hello' }]
</script>
<template>
  <ul>
    <TodoItem v-for="todo in todos" :todo="todo" :key="todo.id" />
  </ul>
</template>

<style scoped></style>
