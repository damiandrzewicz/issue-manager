<template>
  <v-app>
    <NavigationBar @toggleNavigationDraver="toggleNavDraver" />
    <NavigationDrawer :showNavigationDraver="showNavDraver" @update:showNavigationDraver="updateNavDrawer"/>
    
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
import NavigationBar from "@/components/nav/NavigationBar.vue"
import NavigationDrawer from "@/components/nav/NavigationDrawer.vue"

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
  mounted(){
    this.$store.dispatch("projectStore/getProjects")
      .then(() => {
        this.$log.debug("data fetched");
        this.$store.dispatch("projectTreeStore/selectAll");
        });

    

    this.$store.dispatch("taskStore/getTasks")
  },
  created() {
    this.$log.info('App created')

  }
};
</script>
