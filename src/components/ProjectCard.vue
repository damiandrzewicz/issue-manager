<template>
    <div >
        <!-- :color="showSubItems ? 'secondary' : ''" -->
        
        <v-hover v-slot="{ hover }">
            <v-card flat :class="['px-5 py-1 ma-1',{ 'on-hover': hover, 'card-opened secondary': showSubItems}]" 
            
                :elevation="hover ? 16 : 2" 
                @click="toggleSubitemsVisibility" >
                <v-layout row >
                    <v-flex xs12 md3>
                        <div :class="['caption', showSubItems ? 'white--text' : 'grey--text' ]" >Project name</div>
                        <div>{{ project.name }}</div>
                    </v-flex>
                    <v-flex xs12 md3>
                        <div :class="['caption', showSubItems ? 'white--text' : 'grey--text' ]">Project description</div>
                        <div>{{ project.description }}</div>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex md3 class="d-flex align-center justify-center">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    small 
                                    v-bind="attrs" 
                                    v-on="on" 
                                    @click.stop="onEdit" 
                                    @mousedown.stop
                                    :color="showSubItems ? 'white' : ''">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit project</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    small 
                                    v-bind="attrs" 
                                    v-on="on" 
                                    @click.stop="onDelete" 
                                    @mousedown.stop
                                    :color="showSubItems ? 'white' : ''">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit project</span>
                        </v-tooltip>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-progress-linear :value="presentation.progress" striped height="6" :color="presentation.color"></v-progress-linear>
                </v-layout>
            </v-card>
         </v-hover>

        <div v-if="project.subprojects && showSubItems" class="pl-5">
            <div v-for="subproject in project.subprojects" :key="subproject.id">
                <Project :project="subproject"/>
            </div>
            <AddProjectCard/>
        </div>
    </div>

</template>

<script>
import AddProjectCard from "@/components/AddProjectCard.vue"

export default {
    name: "Project",
    components: { AddProjectCard },
    props: ['project'],
    data: () => ({
        showSubItems: false,
        presentation: {
            progress: 0,
            color: 'blue'
        }
       
    }),
    methods: {
        toggleSubitemsVisibility(){
            if(this.project.subprojects){
                this.showSubItems = ! this.showSubItems 
            }
        },
        calcProgress(){
            this.presentation.progress = 80;
        },
        calcColor(){
            const between = function(x, min, max){
                return x >= min && x <= max;
            };
            const v = this.presentation.progress;
            if(between(v, 0, 20)){
                this.presentation.color = "red";
            }else if(between(v, 21, 40)){
                this.presentation.color = "yellow";
            }else if(between(v, 41, 60)){
                this.presentation.color = "orange";
            }else if(between(v, 61, 80)){
                this.presentation.color = "grey";
            }else if(between(v, 81, 99)){
                this.presentation.color = "blue";
            }
            else if(v == 100){
                this.presentation.color = "green";
            }
        },

        onEdit(){
            console.log(`onEdit, project.id=${this.project.id}`);
        },
        onDelete(){
            console.log(`onDelete, project.id=${this.project.id}`);
        },
        onAddProject(){
            console.log("on add project");
            //todo emit event
            // this.emit('addProjectEvent');
        }
    },
    mounted(){
        this.calcProgress();
        this.calcColor();
    }
}
</script>

<style>
.v-card--link:before, .v-icon:after {
    background-color: white !important;
}
.card-opened{
    color: white !important;
}
</style>