<template>
    <div>
        <div v-for="task in getTasks" :key="task.id">
            <TaskCard :task="task" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskCard from "@/components/task/TaskCard"

export default {
    name: "TasksTree",
    components: { TaskCard },
    computed: {
        ...mapGetters("taskStore", [
            "getTasks"
        ]),
    }
}
</script>

<style>

</style>