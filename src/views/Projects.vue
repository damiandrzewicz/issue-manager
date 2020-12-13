<template>
  <div class="projects">
    <h1>Projets</h1>

    <v-container class="my-5">
        <div v-for="project in projects" :key="project.id">
            <ProjectCard :project="project"/>
        </div>
        <AddProjectCard />
    </v-container>
  </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue"
import AddProjectCard from "@/components/AddProjectCard.vue"

import { mapGetters, mapActions } from 'vuex'


export default {
    name: "Projects",
    components: { ProjectCard, AddProjectCard },
    computed: {
        // ...mapState({
        //     projects: state => state.projects.all
        // }),
        ...mapGetters("projects", {
            projects: "getRootProjects"
        })
    },
    methods: mapActions("projects", []),
    created(){
        this.$store.dispatch("projects/getAllProjects");
    }

}   
</script>

<style>

</style>