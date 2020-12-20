<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="700"
      >
        <v-card>
          <v-card-title class="headline">
            Add task
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-row>
              <v-col>
                <v-text-field label="Name" prepend-icon="mdi-folder" v-model="task.name" :rules="nameRules"></v-text-field>
                <v-textarea class="my-3" label="Description" height="80" prepend-icon="mdi-pen" :rules="descriptionRules" v-model="task.description"></v-textarea>
                <v-text-field label="URL" prepend-icon="mdi-link" :rules="urlRules" v-model="task.externalUrl"></v-text-field >
                <v-text-field v-show="task.externalUrl" label="URL short name" prepend-icon="mdi-link" v-model="task.externalUrlShortcut"></v-text-field>
                <v-combobox label="Project" :items="getProjectsNameList" prepend-icon="mdi-book-open-blank-variant" :rules="projectRules" v-model="task.project"></v-combobox>
                  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="task.deadline"
                        label="Deadline"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="task.deadline"
                      @input="menu = false"
                      :allowed-dates="allowedDates"
                    ></v-date-picker>
                  </v-menu>
                  <v-combobox label="Priority" :items="getTaskPriorities()" v-model="priorityHelper">
                      <template slot="item" slot-scope="data">
                        <v-icon :style="{ color: data.item.color }">mdi-flag</v-icon>  {{data.item.text}}
                      </template>
                      <template slot="prepend">
                        <v-icon :style="{ color: priorityHelper.color }">mdi-flag</v-icon>
                      </template>
                      <template slot="default">
                        zxczxc
                      </template>
                  </v-combobox>

                  <v-text-field v-model="task.estimatedPoodoro" type="number" prepend-icon="mdi-timer" label="Estimated pomodoro sessions" min=1 max=100 :rules="[estimatedPomodoroRules]"
                    @oninput="obj => {if(Number(obj.value) > Number(obj.max)) obj.value = obj.max;}"/>
              </v-col>
            </v-row>
            </v-form>
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
// import TaskPriority from "@/domain/TaskPriorityModel"

export default {
  name: "EditProjectDialog",
  props: {
    show: {
      type: Boolean
    },
  },
  data(){
    return{
      menu: false,

      // Model
      task: new TaskModel(),
      priorityHelper: { text: "No", color: 'grey'},

      // Validation rules
      nameRules: [ v => !!v || 'Name is required'],
      descriptionRules: [],
      urlRules: [],
      projectRules: [v => !!v || 'Project is required'],
      estimatedPomodoroRules: v => {
        if (!isNaN(parseFloat(v)) && v >= 1 && v <= 100) return true;
        return 'Number has to be between 1 and 100';
      },
      
    }
  },
  computed: {
    ...mapGetters("projectStore", [
            "getProjectsNameList"
    ]),
    showDialog: {
      get() {
        return this.show;
      },
      set(value){
        this.$emit("show", value);
      }
    },
  },
  mounted(){

  },
  methods: {
    // Handlers
    onOk(){
      if(!this.$refs.form.validate())
        return;

      console.log("validated");

      this.resetForm();
      this.$refs.form.resetValidation();

      this.showDialog = false;
    },
    onCancel(){
      this.resetForm();
      this.$refs.form.resetValidation();
      this.showDialog = false;
    },

    // Getters
    getTaskPriorities(){
      return [
        { text: "No", color: 'grey'},
        { text: "Low", color: 'yellow'},
        { text: "Medium", color: 'orange'},
        { text: "High", color: 'red'}
      ];
    },

    allowedDates: val => {
      let selectedDate = new Date(val);
      selectedDate.setHours(0, 0, 0, 0); 
      let nowDate = new Date(Date.now());
      nowDate.setHours(0, 0, 0, 0); 
      return selectedDate >= nowDate;
      },
      resetForm(){
        this.task = new TaskModel();
        this.priorityHelper = { text: "No", color: 'grey'};
      }
  }
}
</script>

<style>

</style>