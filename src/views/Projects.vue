<template>
  <div class="projects">
    <h1>Projets</h1>

    <v-container class="my-5">

        <div v-for="project in projects" :key="project.id">
            <Project :project="project"/>
        </div>
    </v-container>
  </div>
</template>

<script>
import Project from "@/components/Project.vue"

export default {
    name: "Projects",
    components: { Project },
    data: () => ({
        projects: [
            { id: 1, name: "My Project 1", description: "Project description 1", subprojects: [
                { id: 2, name: "My SubProject 1", description: "SubProject description 1" },
                { id: 3, name: "My SubProject 2", description: "SubProject description 1" },
                { id: 4, name: "My SubProject 3", description: "SubProject description 1" }
            ]}
        ],
    })
}
</script>

<style>

</style>