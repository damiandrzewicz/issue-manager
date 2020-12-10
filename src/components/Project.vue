<template>
    <div >
        <!-- :color="showSubItems ? 'secondary' : ''" -->
        <v-card flat @click="toggleSubitemsVisibility">
            <v-layout row :class="`px-5 py-1 ma-1`" :style="{ backgroundColor: 'white' }">
                <v-flex xs12 md6>
                    <div class="caption grey--text">Project name</div>
                    <div>{{ project.name }}</div>
                </v-flex>
                <v-flex xs12 md6>
                    <div class="caption grey--text">Project description</div>
                    <div>{{ project.description }}</div>
                </v-flex>
            </v-layout>
        </v-card>

        <div v-if="project.subprojects && showSubItems" class="pl-5">
            <div v-for="subproject in project.subprojects" :key="subproject.id">
                <Project :project="subproject"/>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Project",
    props: ['project'],
    data: () => ({
        showSubItems: false
    }),
    methods: {
        toggleSubitemsVisibility(){ this.showSubItems = ! this.showSubItems }
    }
}
</script>

<style>
.asd {
    background-color: red;
}
</style>