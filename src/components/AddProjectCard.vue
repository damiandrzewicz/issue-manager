<template>
    <v-hover v-slot="{ hover }">
        <v-card flat :class="{'px-5 ma-1 grey lighten-4' : true, 'on-hover': hover}" :elevation="hover ? 16 : 2"  >
            
            <v-form ref="form">
                <v-layout row >
                    <v-flex class="pr-2" xs12 md3>
                        <v-text-field v-model="project.name" required label="Enter Project Name"></v-text-field>
                    </v-flex>
                    <v-flex class="pr-2" xs12 md3>
                        <v-text-field v-model="project.description" label="Enter Project Description"></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex md3 class="d-flex justify-center align-center grey--text">
                        <v-btn :disabled="!project.name" @click="onAddProject">
                            Add Project
                            <v-icon class="mx-3">mdi-folder-plus</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>  
        </v-card>
    </v-hover>
</template>

<script>
import ProjectModel from "@/domain/ProjectModel"

export default {
    name: "AddProjectCard",
    props: ['parentId'],
    data: () => ({
        project: new ProjectModel(null),
    }),
    methods: {
        onAddProject(){
            this.$refs.form.validate();
            this.project.parentId = this.$props.parentId;

            console.log(`onAddProject, adding subproject=${ JSON.stringify(this.project) } to project.id=${this.$props.parentProject ? this.$props.parentProject.id : 'root'}`);

            this.$store.dispatch("projects/addProject", this.project);

            this.project = new ProjectModel(null);
            this.$refs.form.reset();
        },
    }
}
</script>

<style>
.add-project-hover{
    color: 'g'
}
</style>