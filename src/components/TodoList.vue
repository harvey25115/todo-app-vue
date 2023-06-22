<script setup lang="ts">
import TodoItem from './TodoItem.vue'

defineProps(['todos', 'onDelete', 'onCompleted'])

// sample data
// const todos = [{ _id: 1, content: 'hello', isDone: true }]
</script>

<template>
  <ul class="todoList">
    <TodoItem
      v-for="todo in todos"
      :todo="todo"
      :key="todo._id"
      :on-delete="onDelete"
      :on-completed="onCompleted"
    />
  </ul>
</template>

<style scoped>
.todoList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  list-style-type: none;
  padding: 2rem 0;
  margin: 0;
}
</style>
