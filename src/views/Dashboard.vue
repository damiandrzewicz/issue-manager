<template>
  <div class="dashboard">
    <h1  class="mx-12">Issues Dashboard</h1>
    <v-container class="my-5">
      <v-row>
        <v-col md="3" xl="3">
          <v-card>
            <v-treeview :items="this.getProjectsTree" item-children="subprojects" selectable>

            </v-treeview>
          </v-card>
        </v-col>
        <v-col md="9" xl="9">
          <v-card>test123</v-card>
        </v-col>
        
      </v-row>

      <TaskCard/>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TaskCard from "@/components/task/TaskCard"

export default {
  name: 'Dashboard',
  data() {
    return {
      projectsTree: []
    }
  },
  components: { TaskCard },
  computed: {
    ...mapGetters("projectsTree", [
        "getProjectsTree"
    ])

  },
  methods: {
    ...mapActions("projectsTree", ["buildProjectTreeView"])
  },
  mounted(){
    this.buildProjectTreeView()
    console.log(this.getProjectsTree);
  }
}
</script>
