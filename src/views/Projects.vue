<template>
  <div class="projects">
    <h1 class="mx-12">Projets</h1>
    <v-container class="my-5">
        <div v-for="project in getRootProjects" :key="project.id">
            <ProjectCard :project="project"/>
        </div>
        <AddProjectCard />
    </v-container>
  </div>
</template>

<script>
import ProjectCard from "@/components/project/ProjectCard.vue"
import AddProjectCard from "@/components/project/AddProjectCard.vue"


import { mapGetters } from 'vuex'


export default {
    name: "Projects",
    components: { ProjectCard, AddProjectCard },

    computed: {
        ...mapGetters("projects", [
            "getRootProjects"
        ])
    },
    created(){
        this.$log.debug("[Projects] component created")
    }

}   
</script>

<style>

</style>