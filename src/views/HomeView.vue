<script setup lang="ts">
import { ref } from 'vue'
import { useTodos } from '@/composables/todos'
import TodoList from '@/components/TodoList.vue'
import TodoInput from '@/components/TodoInput.vue'

// reactive input
const todoInput = ref('')

// reset input after save
function save() {
  saveTodo(todoInput.value)
  todoInput.value = ''
}

// call todo data config
const { todos, isLoading, changeToDone, deleteTodo, saveTodo } = useTodos()
</script>

<template>
  <h1 class="heading">List of things to do!</h1>
  <main class="todoContainer">
    <form class="todoContainer__section todoContainer__section--padded" @submit.prevent="save">
      <TodoInput v-model="todoInput" />
      <button class="btn">ADD</button>
    </form>
    <div class="todoContainer__section">
      <div v-if="isLoading" class="info">loading data...</div>
      <div v-else-if="!todos.length" class="info">nothing to do!</div>
      <TodoList v-else :todos="todos" :on-delete="deleteTodo" :on-completed="changeToDone" />
    </div>
  </main>
</template>

<style scoped>
.heading {
  text-align: center;
}
.todoContainer {
  display: flex;
  flex-direction: column;
  padding: 0 15%;
  gap: 1rem;
}
.todoContainer__section {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
.todoContainer__section--padded {
  margin-top: 3rem;
}
.btn {
  width: 30%;
  border: 3px solid var(--btn-c-blue);
  color: var(--btn-c-blue);
  font-weight: bold;
}

.info {
  font-size: 1.5rem;
  color: var(--primary-c-grey);
}

/* media queries */
@media (max-width: 425px) {
  .todoContainer {
    padding: 0 7%;
  }
}
</style>
