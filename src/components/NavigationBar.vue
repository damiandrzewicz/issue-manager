<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="toggleNavigationDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Issue Manager</v-toolbar-title>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        toggleNavigationDrawer(){
            this.$emit("toggleNavigationDraver");
        }
    }
}
</script>

<style>

</style>