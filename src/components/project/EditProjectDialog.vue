<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="400"
      >
        <v-card>
          <v-card-title class="headline">
            Edit project
          </v-card-title>
          <v-card-text>
            <v-text-field required v-model="name" label="Project name"></v-text-field>
            <v-textarea v-model="description" label="Project description"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="onOk" :disabled="!name">Ok</v-btn>
            <v-btn text @click="onCancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>
import ProjectModel from "@/domain/ProjectModel"

export default {
  name: "EditProjectDialog",
  props: {
    show: {
      type: Boolean
    },
    project: {
      type: ProjectModel
    }
  },
  data(){
    return{
      name: null,
      description: null
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set(value){
        this.$emit("setShow", value);
      }
    }
  },
  mounted(){
    this.name = this.$props.project.name;
    this.description = this.$props.project.description;
  },
  methods: {
    onOk(){
      let project = new ProjectModel(this.$props.project);
      project.name = this.name;
      project.description = this.description;
      this.$store.dispatch("projectStore/updateProject", project);
      this.showDialog = false;
    },
    onCancel(){
      this.showDialog = false;
    }
  }
}
</script>

<style>

</style>