import Vue from 'vue'
import Vuex from 'vuex'

import projectStore from "@/store/modules/projectStore"
import projectTreeStore from "@/store/modules/projectTreeStore"
import taskStore from "@/store/modules/taskStore"


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        projectStore,
        taskStore,
        projectTreeStore
    },
    strict: debug
});