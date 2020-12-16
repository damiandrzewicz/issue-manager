import Vue from 'vue'
import Vuex from 'vuex'

import projects from "@/store/modules/projects"
import projectsTree from "@/store/modules/projectsTree"

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        projects,
        projectsTree
    },
    strict: debug
});