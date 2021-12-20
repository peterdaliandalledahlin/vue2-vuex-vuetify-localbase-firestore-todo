<template>
    <v-list
        flat
        class="pt-0"
      >
        <draggable v-model="tasks" handle=".handle">
            <task
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            />
        </draggable>
    </v-list>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable,
        'task': require('./Task.vue').default
    },
    computed:{
        tasks: {
            get() {
                return this.$store.getters.tasksFiltered
            },
            set(value) {
                this.$store.dispatch('setTasks', value)
            }
        }
    }
}
</script>
