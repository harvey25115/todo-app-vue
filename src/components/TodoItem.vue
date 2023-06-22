<script setup lang="ts">
defineProps(['todo', 'onDelete', 'onCompleted'])
</script>

<template>
  <li class="todoItem" :class="{ 'todoItem--done ': todo.isDone }">
    <span class="todoItem__text">{{ todo.content }}</span>
    <button
      v-if="!todo.isDone"
      class="todoItem__btn todoItem__btn__done"
      @click="onCompleted(todo)"
    >
      Done
    </button>
    <button class="todoItem__btn todoItem__btn__delete" @click="onDelete(todo)">Delete</button>
  </li>
</template>

<style scoped>
.todoItem {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-c-pink);
  padding: 1rem;
  border-radius: 1rem;
}
.todoItem__text {
  flex: 1;
}
.todoItem--done {
  background-color: var(--primary-c-grey);
}
.todoItem--done > .todoItem__text {
  text-decoration: line-through;
}
.todoItem__btn {
  transition: color 0.2s;
  transition: background-color 0.2s;
}
.todoItem__btn__done {
  color: var(--btn-c-green);
  border: 1px solid var(--btn-c-green);
}
.todoItem__btn__done:hover {
  color: white;
  background-color: var(--btn-c-green);
}
.todoItem__btn__delete {
  color: var(--btn-c-red);
  border: 1px solid var(--btn-c-red);
}
.todoItem__btn__delete:hover {
  color: white;
  background-color: var(--btn-c-red);
}
</style>
