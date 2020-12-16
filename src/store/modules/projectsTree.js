import Vue from 'vue'
import ProjectModelTreeView from "@/domain/ProjectModelTreeView"

// import Vue from 'vue'

// initial state
const state = () => ({
    projectsTreeView: []
});

// getters
const getters = {
    getProjectsTree: (state) => {

        return state.projectsTreeView;
    },

    buildProjectLevel: (state, getters, rootState, rootGetters) => project =>{
        let projectItem = new ProjectModelTreeView();
        projectItem.id = project.id;
        projectItem.name = project.name

        project.subprojectIds.forEach(item => {
            let project = rootGetters["projects/getProjectById"](item);
            projectItem.subprojects.push(getters.buildProjectLevel(project));
        })
        return projectItem;
    }
}

const actions = {
    buildProjectTreeView({ commit, getters, rootGetters }){
        let projects = rootGetters["projects/getRootProjects"];
        projects.forEach((project) => {
            commit("appendProjectTreeView", getters.buildProjectLevel(project));
        })
        Vue.$log.debug(`buildProjectTreeView: ${getters.getProjectsTree}`)
    }
}

const mutations = {
    appendProjectTreeView(state, project){
        state.projectsTreeView.push(project);
    },
    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};