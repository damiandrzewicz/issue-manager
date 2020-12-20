<template>
    <v-app-bar app>
        <v-row align="center">
            <v-app-bar-nav-icon @click.stop="toggleNavigationDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Issue Manager</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-row>

    </v-app-bar>
</template>

<script>

export default {
    name: "NaviagtionBar",
    components: { },
    methods: {
        toggleNavigationDrawer(){
            this.$emit("toggleNavigationDraver");
        },
    }
}
</script>

<style>

</style>