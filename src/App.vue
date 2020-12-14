<template>
  <v-app>
    <NavigationBar @toggleNavigationDraver="toggleNavDraver" />
    <NavigationDrawer :showNavigationDraver="showNavDraver" @update:showNavigationDraver="updateNavDrawer"/>
    
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
  methods: {
    toggleNavDraver(){
      this.showNavDraver = !this.showNavDraver;
    },
    updateNavDrawer(val){
      this.showNavDraver = val;
    }
  },
  created() {
    this.$log.info('App created')
    this.$store.dispatch("projects/getAllProjects");
  }
};
</script>
