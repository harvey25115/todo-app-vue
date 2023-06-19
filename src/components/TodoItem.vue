<script setup lang="ts">
const props = defineProps(['todo'])
</script>

<template>
  <li>{{ props.todo.content }}</li>
</template>

<style scoped></style>
