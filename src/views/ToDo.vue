<template>
  <div class="todo pa-4">

    <field-add-task />

    <list-tasks v-if="$store.state.tasks.length" />

    <no-tasks v-else />

    <button-done-sorting v-if="$store.state.sorting" />
      
  </div>
</template>

<script>
  export default {
    name: 'todo',
    components: {
      'field-add-task': require('../components/ToDo/FieldAddTask.vue').default,
      'list-tasks': require('../components/ToDo/ListTasks.vue').default,
      'no-tasks': require('../components/ToDo/NoTasks.vue').default,
      'button-done-sorting': require('../components/ToDo/ButtonDoneSorting.vue').default,
    }
  }
</script>
