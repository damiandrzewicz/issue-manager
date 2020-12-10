<template>
    <v-hover v-slot="{ hover }">
        <v-card flat :class="{'px-5 ma-1' : true, 'on-hover': hover}" :elevation="hover ? 16 : 2" >
            
            <v-form>
                <v-layout row >
                    <v-flex class="pr-2" xs12 md3>
                        <v-text-field label="Enter Project Name"></v-text-field>
                    </v-flex>
                    <v-flex class="pr-2" xs12 md3>
                        <v-text-field label="Enter Project Description"></v-text-field>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex md3 class="d-flex justify-center align-center grey--text">
                        <v-btn @click="onAddProject">
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
export default {
    name: "AddProjectCard",
    props: [],
    data: () => ({}),
    methods: {
        onAddProject(){
            console.log(`onAddProject, adding subproject X to project.id=`);
            //todo emit event
            this.emit('addProjectEvent');
        }
    }
}
</script>

<style>
.add-project-hover{
    color: 'g'
}
</style>