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
            <v-text-field required v-model="description" label="Project description"></v-text-field>
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
      name: "",
      description: ""
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