<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="700"
      >
        <v-card>
          <v-card-title class="headline">
            Add state message for {{task.name}}
          </v-card-title>
          <v-card-text>
            <v-text-field readonly solo :label="`Current percent: ${task.currentPercent}%`"></v-text-field>

            <v-form ref="form" lazy-validation>
              <v-row>
                <v-col>
                  <v-textarea class="my-3" label="Message" height="80" prepend-icon="mdi-pen" :rules="descriptionRules" v-model="message"></v-textarea>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn @click="onAddMessage(message)">
                  <v-icon left>mdi-plus</v-icon>
                  Add Message
                  </v-btn>
              </v-row>
            </v-form>

            <v-list dense max-height="400" class="overflow-y-auto">
              <v-subheader>Another messages</v-subheader>
              <v-list-item v-for="(msg, i) in getAnotherMessagesReversedList" :key="i">
                <v-list-item-icon>
                  <v-btn small icon @click="onDeleteMessage(i)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="msg"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="onOk">Ok</v-btn>
            <v-btn text @click="onCancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskModel from "@/domain/TaskModel"

export default {
  name: "AddTaskMessageDialog",
  props: {
    show: {
      type: Boolean
    },
    task: {
      type: TaskModel,
      default: null
    }
  },
  mounted(){

  },
  data(){
    return{
      menu: false,

      // Model
      message: "",
      anotherMessages: this.getMessagesForCurrentPercent(),

      // Validation rules
      descriptionRules: [v => !!v || "Message can't be empty!"],
    }
  },
  computed: {
    ...mapGetters("projectStore", [
            "getProjectsNameList",
            "getProjects"
    ]),
    showDialog: {
      get() {
        return this.show;
      },
      set(value){
        this.$emit("show", value);
      }
    },
    getAnotherMessagesReversedList(){
      return this.anotherMessages.slice().reverse();
    }
  },
  methods: {
    // Handlers
    onOk(){
      if(!this.$refs.form.validate())
        return;

      // console.log("validated");

      // this.tempTask.priority = TaskPriority.fromString(this.priorityHelper);
      // this.tempTask.projectId = this.getProjects.find(p => p.name === this.projectName).id;

      // console.log(this.tempTask);

      // this.$store.dispatch("taskStore/addTask", {task: this.tempTask});

      // this.resetForm();
      // this.$refs.form.resetValidation();

      this.showDialog = false;
    },
    onCancel(){
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.showDialog = false;
    },
    onDeleteMessage(index){
      console.log(`delete msg index=${index}`);
      this.anotherMessages.splice(index, 1);
    },
    onAddMessage(msg){
      if(msg){
        this.anotherMessages.push(msg);
      }
      
    },

    // Getters
    getMessagesForCurrentPercent(){
      let state = this.task.stateMessages.find(msg => msg.percent === this.task.currentPercent);
      let copy = [];
      if(state){
        Object.assign(copy, JSON.parse(JSON.stringify(state.messages)))
        console.log(copy);
      }
      return copy;
    }
  }
}
</script>

<style>

</style>