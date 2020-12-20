<template>
    <div>
        <v-card class="px-5">
            <v-row col>
                <v-col class="pa-0" sm="3">
                    <div :class="['caption', 'grey--text' ]" >Name</div>
                    <div v-if="!task.url"> {{ task.name }}</div>
                    <a class="black--text" v-else :href="task.url" target="_blank"> {{ task.name }}</a>
                </v-col>
                <v-col class="pa-0" sm="2">
                    <v-row class="pa-0" align="center">
                        <v-btn small icon @click="startPomodoroSession">
                            <v-icon :style="{fontSize: '3em'}">mdi-play</v-icon>
                        </v-btn>
                        <v-col class="pa-0">
                            <div :class="['caption', 'grey--text' ]" >Pomodoro</div>
                            <div> {{ task.currentPomodoro }} / {{ task.estimatedPoodoro }}</div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="pa-0" sm="3">
                    <div :class="['caption', 'grey--text' ]" >Opened/Left days | Deadline</div>
                    <div> {{ calcOpenedDays }} / {{ calcLfetDays }} ({{formatDeadline}})</div>
                </v-col>
                <v-col class="pa-0" sm="2">
                    <div :class="['caption', 'grey--text' ]" >Priority</div>
                    <div>
                        <v-icon :style="{color: prioToColor}">mdi-flag-variant</v-icon>
                    </div>
                </v-col>
                <v-col sm="1" class="pa-0 d-flex">
                    <v-row justify="center" align="center">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    small 
                                    v-bind="attrs" 
                                    v-on="on" 
                                    @click.stop="onEdit" 
                                    @mousedown.stop
                                    >
                                    <v-icon :style="{fontSize: '2em'}">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit issue</span>
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
                                    >
                                    <v-icon :style="{fontSize: '2em'}">mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete issue</span>
                        </v-tooltip>
                    </v-row>
                </v-col> 
                
            </v-row>
            <v-row class="pa-0 pb-1" justify="center" align="center">
                <v-col class="pa-0 pr-3" sm="11">
                    <v-progress-linear :value="task.currentPercent" striped height="6" :color="'red'"></v-progress-linear>
                </v-col>
                <v-col :class="['pa-0', 'font-size: 1em']" sm="1" align-self="center">
                    <v-row justify="center">
                        <v-btn small icon @click="increaseProgress">
                            <v-icon >mdi-minus-circle</v-icon>
                        </v-btn>
                        <span class="d-flex justify-center align-center"> {{task.currentPercent}}% </span>
                        <v-btn small icon @click="decreaseProgress">
                            <v-icon >mdi-plus-circle</v-icon>
                        </v-btn>
                    </v-row>
                </v-col>  
            </v-row>
        </v-card>
    </div>
</template>

<script>
import TaskPriorityModel from "@/domain/TaskPriorityModel"
import TaskModel from "@/domain/TaskModel"

export default {
    name: "TaskCard",
    data() {
        return {
            task: new TaskModel()
        }
    },
    created() {
        this.task.name = "Create webpage layout";
        this.task.currentPercent = 55;
        this.task.priority = TaskPriorityModel.Medium;
        this.task.url = 'https:/www.google.pl';
    },
    computed: {
        prioToColor(){
            if(this.task.priority === TaskPriorityModel.Low){
                return 'green';
            }else if(this.task.priority === TaskPriorityModel.Medium){
                return 'orange';
            }else if(this.task.priority === TaskPriorityModel.High){
                return 'red';
            }else {
                return 'grey';
            }
        },
        calcOpenedDays(){
            return 23;
        },
        calcLfetDays(){
            return 33;
        },
        formatDeadline(){
            let date = new Date(this.task.created);
            return `${date.getDate()}-${date.getMonth()}-${date.getYear()}`
        },
    },
    methods: {
        startPomodoroSession(){

        },
        increaseProgress(){

        },
        decreaseProgress(){

        }
    }
}
</script>

<style>
.percent{
    font-size: 0.8em;
}
</style>