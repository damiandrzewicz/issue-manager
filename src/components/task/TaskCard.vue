<template>
    <div>
        <AddTaskMessageDialog :show="showMessageDialog" :task="task" @show="onToggleAddTaskMessageDialog"/>
        
        <v-hover  v-slot="{ hover } ">
            <div>
                <v-card  :disabled="!hover && isTaskClosed">
                    <v-card-text class="py-0">
                        <v-overlay :absolute="true" :value="hover">
                            <v-btn @click="reopenIssue">Reopen issue</v-btn>
                        </v-overlay>
                        <v-row col>
                            <v-col  sm="3">
                                <div :class="['caption', 'grey--text' ]" >Name</div>
                                <span> {{ task.name }}</span>
                                <a class="black--text" :href="task.url" target="_blank" v-if="task.externalUrl"> ({{ task.externalUrlShortcut }})</a>
                            </v-col>
                            <v-col sm="2">
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
                            <v-col sm="3">
                                <div :class="['caption', 'grey--text' ]" >Opened/Left days | Deadline</div>
                                <div> {{ calcOpenedDays }} / {{ calcLfetDays }} ({{formatDeadline}})</div>
                            </v-col>
                            <v-col sm="1">
                                <div :class="['caption', 'grey--text' ]" >Priority</div>
                                <div>
                                    <v-icon :style="{color: prioToColor}">mdi-flag-variant</v-icon>
                                </div>
                            </v-col>
                            <v-col sm="1" class="d-flex">
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
                        <v-row  justify="center" align="center">
                            <v-col sm="10">
                                <v-progress-linear :value="getLatestProgress" striped height="6" :color="calcColor"></v-progress-linear>
                            </v-col>
                            <v-col :class="['pa-0', 'font-size: 1em']" sm="1" align-self="center">
                                <v-row justify="center">
                                    <v-btn small icon @click="decreaseProgress">
                                        <v-icon >mdi-minus-circle</v-icon>
                                    </v-btn>
                                    <span class="d-flex justify-center align-center"> {{getLatestProgress}}% </span>
                                    <v-btn small icon @click="increaseProgress">
                                        <v-icon >mdi-plus-circle</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-col>  
                            <v-col class="d-flex justify-center align-center pa-0">
                                <v-btn small icon @click="addStateMessage">
                                    <v-icon >mdi-message-plus</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    
                </v-card>
            </div>
        </v-hover>
    </div>
</template>

<script>
import TaskPriorityModel from "@/domain/TaskPriorityModel"
import TaskModel from "@/domain/TaskModel"
import AddTaskMessageDialog from "@/components/task/AddTaskMessageDialog"

export default {
    name: "TaskCard",
    components: {AddTaskMessageDialog},
    props: {
        task: {
            type: TaskModel
        }
    },
    data() {
        return {
            showMessageDialog: false
        }
    },
    created() {
        this.$log.debug(`created card for task id=${this.task.id}`)
    },
    computed: {
        calcColor(){
            const between = function(x, min, max){return x >= min && x <= max;};
            const v = this.getLatestProgress;
            if(between(v, 0, 20)){return "red";}
            else if(between(v, 21, 40)){return "yellow";}
            else if(between(v, 41, 60)){return "orange";}
            else if(between(v, 61, 80)){return "grey";}
            else if(between(v, 81, 99)){return "blue";}
            else{return "green";}
        },
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
        getLatestProgress(){
            return this.task.getLatestProgress();
        },
        isTaskClosed(){
            return this.task.isClosed();
        }
    },
    methods: {

        startPomodoroSession(){

        },
        increaseProgress(){
            let task = this.task.deepCopy();
            if(task.increaseProgress()){
                this.$store.dispatch("taskStore/updateTask", task);
            }
            
        },
        decreaseProgress(){
            let task = this.task.deepCopy();
            if(task.decreaseProgress()){
                this.$store.dispatch("taskStore/updateTask", task);
            }
        },
        addStateMessage(){
            this.onToggleAddTaskMessageDialog(true);
        },
        onToggleAddTaskMessageDialog(value){
            this.showMessageDialog = value;
        },
        reopenIssue(){
            let task = this.task.deepCopy();
            task.startNewWorkflow();
            this.$store.dispatch("taskStore/updateTask", task);
        }
    }
}
</script>

<style>
.percent{
    font-size: 0.8em;
}
</style>