<template>
    <div>
        <v-menu
        bottom
        left
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="handleClick(index)"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <DialogEdit 
            v-if="dialogs.edit"
            @close="dialogs.edit = false"
            :task="task"
        />
        <DialogDueDate 
            v-if="dialogs.duedate"
            @close="dialogs.duedate = false"
            :task="task"
        />
        <DialogDelete
            v-if="dialogs.delete"
            @close="dialogs.delete = false"
            :task="task"
        />
    </div>
</template>

<script>
import DialogEdit from './Dialogs/DialogEdit.vue'
import DialogDueDate from './Dialogs/DialogDueDate.vue'
import DialogDelete from './Dialogs/DialogDelete.vue'
    export default {
        props: ['task'],
        data: () => ({
            dialogs: {
                edit: false,
                duedate: false,
                delete: false
            },
            items: [
                { title: 'Edit', icon: 'mdi-pencil', click(){ this.dialogs.edit = true }},
                { title: 'Due date', icon: 'mdi-calendar', click(){ this.dialogs.duedate = true }},
                { title: 'Delete', icon: 'mdi-delete', click(){ this.dialogs.delete = true }},
                { title: 'Sort', icon: 'mdi-drag-horizontal', click(){
                    if(!this.$store.state.search) {
                        this.$store.commit('toggleSorting') 
                    }else {
                        this.$store.commit('showSnackbar', 'Sorting disabled while sorting')
                    }
                }},
            ],
        }),
        methods: {
            handleClick(index) {
                this.items[index].click.call(this)
            }
        },
        components: {
        DialogDelete,
        DialogEdit,
        DialogDueDate
    }
    }
</script>

<style>

</style>