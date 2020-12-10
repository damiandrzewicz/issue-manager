<template>
  <v-app>
    <NavigationBar @toggleNavigationDraver="showNavDraver = !showNavDraver" />
    <NavigationDrawer :show="showNavDraver"/>
    
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="mx-12">
        <router-view></router-view>
      </v-container>
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
