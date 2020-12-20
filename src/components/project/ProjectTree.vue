<template>
    <v-card>
        <v-treeview @input="setSelectedIds" :value="getSelectedIds" :items="getProjectTree" item-children="subprojects" selectable open-all>

        </v-treeview>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "ProjectTreeview",
    data: () => ({
    }),
    methods: {
      setSelectedIds(ids){
        this.$store.commit("projectTreeStore/updateSelectedIds", ids)
      }
    },
    computed: {
      ...mapGetters("projectTreeStore", [ "getProjectTree", "getSelectedIds" ]),
    },
}
</script>

<style>

</style>