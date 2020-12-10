<template>
    <v-navigation-drawer app v-model="show">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Issue Manager
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item link v-for="link in links" :key="link.text" :to="link.to" exact>
                <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title >{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script>
export default {
    name: "NavigationDrawer",
    props: ['show'],
    data: () => ({
        links: [
            { text: "Dashboard", icon: "mdi-view-dashboard", to: { name: "Dashboard" } },
            { text: "Projects", icon: "mdi-folder", to: { name: "Projects" } },
            { text: "Activity", icon: "mdi-chart-line-variant", to: { name: "Activity" }},

        ]
    })
}
</script>

<style>

</style>