import { onMounted, onUnmounted, ref } from 'vue'
import PouchDB from 'pouchdb-browser'

/**
 * Todos state management
 * @returns State Objects & methods
 */
export function useTodos() {
  const todos = ref<any>([])
  const isLoading = ref(true)

  // DB init
  const localDB = new PouchDB('todos')
  const remoteDB = new PouchDB('http://localhost:5984/todos')

  // one-way replicate then sync DB on mounted
  let dbSync: any
  let dbChanges: any
  const opts = { live: true, retry: true }
  onMounted(() => {
    // run sync & retry
    localDB.replicate
      .from(remoteDB)
      .on('complete', () => {
        // then two-way, continuous, retriable sync
        dbSync = localDB.sync(remoteDB, opts).on('error', (err) => console.log(err))
      })
      .on('error', (err) => {
        // load initial data from local
        loadData()
        console.log(err)
      })

    // listen for changes & reload data
    dbChanges = localDB
      .changes({ live: true })
      .on('change', () => loadData())
      .on('error', (err) => console.log(err))
  })

  // Cancel sync & change listeners when component is unmounted
  onUnmounted(() => {
    dbSync?.cancel()
    dbChanges.cancel()
  })

  /**
   * Get todos
   */
  function loadData() {
    localDB
      .allDocs({ include_docs: true, descending: true })
      .then((result) => {
        isLoading.value = false
        todos.value = result.rows.map((data) => data.doc)
      })
      .catch((err) => console.log(err))
  }

  /**
   * Save todo
   */
  function saveTodo(todoContent: string) {
    localDB
      .put({ _id: new Date().toISOString(), content: todoContent, isDone: false })
      .then((response) => console.log('added', response))
      .catch((err) => console.log(err))
  }

  /**
   * Delete todo
   * @param todo Document
   */
  function deleteTodo(todo: any) {
    if (confirm('Are you sure to delete?')) {
      localDB
        .remove(todo)
        .then((response) => console.log('deleted', response))
        .catch((err) => console.log(err))
    }
  }

  /**
   * Mark todo as done
   * @param todo Document
   */
  function changeToDone(todo: any) {
    localDB
      .put({ ...todo, isDone: true })
      .then((response) => console.log('updated', response))
      .catch((err) => console.log(err))
  }

  return { todos, isLoading, saveTodo, deleteTodo, changeToDone }
}
