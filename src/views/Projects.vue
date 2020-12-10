<template>
  <div class="projects">
    <h1>Projets</h1>

    <v-container class="my-5">
        <div v-for="project in projects" :key="project.id">
            <ProjectCard :project="project"/>
        </div>
        <AddProjectCard/>
    </v-container>
  </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue"
import AddProjectCard from "@/components/AddProjectCard.vue"


export default {
    name: "Projects",
    components: { ProjectCard, AddProjectCard },
    data: () => ({
        projects: [
            { id: 1, name: "My Project 1", description: "Project description 1", subprojects: [
                { id: 2, name: "My SubProject 1", description: "SubProject description 1" },
                { id: 3, name: "My SubProject 2", description: "SubProject description 1" },
                { id: 4, name: "My SubProject 3", description: "SubProject description 1" }
            ]},
            { id: 5, name: "My Project 2", description: "Project description 1", subprojects: [
                { id: 6, name: "My SubProject 1", description: "SubProject description 1" },
                { id: 7, name: "My SubProject 2", description: "SubProject description 1" },
                { id: 8, name: "My SubProject 3", description: "SubProject description 1" }
            ]},
            { id: 9, name: "My Project 3", description: "Project description 1", subprojects: [
                { id: 10, name: "My SubProject 1", description: "SubProject description 1" },
                { id: 11, name: "My SubProject 2", description: "SubProject description 1" },
                { id: 12, name: "My SubProject 3", description: "SubProject description 1" }
            ]}
        ],
    })
}
</script>

<style>

</style>