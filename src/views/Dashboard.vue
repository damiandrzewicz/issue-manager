<template>
  <div class="dashboard">
    <h1  class="mx-12">Issues Dashboard</h1>
    <AddTaskDialog :show="showAddTaskDialog" @show="handleSetAddTaskDialog"/>
    <v-container fluid class="my-5">
      <div v-if="projectStoreFetched">
          <v-row class="px-3" justify="end">
            <v-btn @click="addIssue">Add Project</v-btn>
          </v-row>
          <v-row>
            <v-col md="3" xl="3">
              <ProjectTree/>
            </v-col>
            <v-col md="9" xl="9">
              <TasksTree/>
            </v-col>
          </v-row>
      </div>

    </v-container>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import { mapGetters } from 'vuex'

import ProjectTree from "@/components/project/ProjectTree"
import TasksTree from "@/components/task/TasksTree"
import AddTaskDialog from "@/components/task/AddTaskDialog"

export default {
  name: 'Dashboard',
  data() {
    return {
      showAddTaskDialog: false
    }
  },
  components: { ProjectTree, TasksTree, AddTaskDialog },
  computed: {
    ...mapGetters("projectStore", {
        projectStoreFetched: "fetched"
    }),
    
  },
  methods: {
    // ...mapActions("projectsTree", ["buildProjectTreeView"])
    addIssue(){
      this.showAddTaskDialog = !this.showAddTaskDialog;
    },
    handleSetAddTaskDialog(value){
        this.showAddTaskDialog = value;
    }
  },
  mounted(){

  }
}
</script>
