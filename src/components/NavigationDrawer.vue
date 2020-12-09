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

        <v-list>
            <div v-for="link in links" :key="link.text">
                <!-- print items without sublinks -->
                <v-list-item link v-if="!link.sublinks">
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- print items with sublinks -->
                <v-list-group v-else :prepend-icon="link.icon">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title v-text="link.text"></v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item v-for="sublink in link.sublinks" :key="sublink.text">
                        <v-list-item-content>
                            <v-list-item-title v-text="sublink.text"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

            </div >


            <!-- <v-list-item link v-for="item in links" :key="item.text">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
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
            { text: "Projects", icon: "mdi-folder", sublinks: [
                {
                    text: "Project 1",
                    to: "/project1"
                },
                {
                    text: "Project 2",
                    to: "/project2"
                },
            ]
            },
            { text: "Activity", icon: "mdi-chart-line-variant", to: { name: "Activity" }}
        ]
    })
}
</script>

<style>

</style>