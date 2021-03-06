<template>
    <div >
        <EditProjectDialog :show="showEditdialog" :project="project" @setShow="onSetShowEditdialog"/>
        <v-hover v-slot="{ hover } ">
            <v-card flat :class="['px-5 py-1 ma-1',{'on-hover': hover,  'card-opened secondary': showSubItems}]" 
            
                :elevation="hover ? 16 : 2" 
                @click="toggleSubitemsVisibility" >
                <v-layout row >
                    <v-flex xs12 md3>
                        <div :class="['caption', showSubItems ? 'white--text' : 'grey--text' ]" >Project name</div>
                        <div>{{ project.name }}</div>
                    </v-flex>

                    <v-tooltip bottom :disabled="!isDescriptionTooLong ">
                        <template v-slot:activator="{ on, attrs }">
                            <v-flex xs12 md3  v-bind="attrs" v-on="on">
                                <div :class="['caption', showSubItems ? 'white--text' : 'grey--text' ]">Project description</div>
                                <div>{{ turncateDescription }}</div>
                            </v-flex>
                        </template>
                        <span>{{ project.description }}</span>
                    </v-tooltip>
                    <v-flex xs12 md2 >
                        <div :class="['caption', showSubItems ? 'white--text' : 'grey--text' ]">Subprojects</div>
                        <div>{{ project.subprojectIds.length }}</div>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex md2 class="d-flex align-center justify-center">
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
                            <span>Delete project</span>
                        </v-tooltip>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-progress-linear :value="calcProgress" striped height="6" :color="calcColor"></v-progress-linear>
                </v-layout>
            </v-card>
         </v-hover>

        <div v-if="showSubItems" class="pl-5">
            <div >
                <div v-for="subprojectId in project.subprojectIds" :key="subprojectId">
                    <ProjectCard :project="getProjectById(subprojectId)"/>
                </div>
            </div>
            <AddProjectCard :parentId="project.id"/>
        </div >

    </div>

</template>

<script>
import AddProjectCard from "@/components/project/AddProjectCard.vue"
import EditProjectDialog from "@/components/project/EditProjectDialog.vue"
import { mapGetters } from 'vuex'

import ProjectModel from "@/domain/ProjectModel"

export default {
    name: "ProjectCard",
    components: { AddProjectCard, EditProjectDialog },
    props: {
        project: {
            type: ProjectModel
        }
    },
    data: () => ({
        showSubItems: false,
        showEditdialog: false,
    }),
    computed: {
        ...mapGetters("projectStore", [
            "getProjectById"
        ]),

        isDescriptionTooLong(){
            const description = this.$props.project.description;
            return (description && description.length > 30);
        },
        turncateDescription(){
            const description = this.$props.project.description;
            if(this.isDescriptionTooLong){
                return this.$props.project.description.substring(0, 30) + "...";
            }else{
                return description;
            }
        },
        calcColor(){
            const between = function(x, min, max){return x >= min && x <= max;};
            const v = this.calcProgress;
            if(between(v, 0, 20)){return "red";}
            else if(between(v, 21, 40)){return "yellow";}
            else if(between(v, 41, 60)){return "orange";}
            else if(between(v, 61, 80)){return "grey";}
            else if(between(v, 81, 99)){return "blue";}
            else{return "green";}
        },
        calcProgress(){
            return 60;
        },
        formatDate(){
            let date = new Date(this.project.created);
            return `${date.getDate()}-${date.getMonth()}-${date.getYear()} ${date.getHours()}:${date.getMinutes()}`
        },
    },
    methods: {
        toggleSubitemsVisibility(){
            this.showSubItems = ! this.showSubItems 
        },

        // Handlers
        onEdit(){
            console.log(`onEdit, project.id=${this.project.id}`);
            this.showEditdialog = true;
        },
        onDelete(){
            this.$log.debug(this.project.id);
            this.$store.dispatch("projectStore/deleteProjectWithDependencies", this.project.id);
        },
        onSetShowEditdialog(value){
            this.showEditdialog = value;
        }
    },
    created(){
        this.$log.debug(`Project card for project.id=${this.project.id}`);
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