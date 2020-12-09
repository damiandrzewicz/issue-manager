<template>
  <v-app>
    <NavigationBar @toggleNavigationDraver="showNavDraver = !showNavDraver" />
    <NavigationDrawer :show="showNavDraver"/>
    <v-main>
     <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue"
import NavigationDrawer from "@/components/NavigationDrawer.vue"

export default {
  name: 'App',

  components: {
    NavigationBar,
    NavigationDrawer
  },

  data: () => ({
      showNavDraver: false
  }),
};
</script>
