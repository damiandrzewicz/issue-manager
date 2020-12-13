import projectsApi from "@/api/projects.js"


// initial state
const state = () => ({
    all: []
});

// getters
const getters = {
    getRootProjects(state){
        return state.all.filter(project => !project.parentId);
    },
    getSubProjects: state => parentId => {
        return state.all.filter(project => project.parentId === parentId);
    }
}

const actions = {
    getAllProjects(store){
        projectsApi.getAllProjects(projects => {
            store.commit("setProjects", projects)
        });
    },
    addProject(store, project){
        project.created = new Date();
        projectsApi.addProject(project, project => {
            store.commit("appendProject", project);
        })
    }
};

const mutations = {
    setProjects(state, projects){
        state.all = projects;
    },
    appendProject(state, project){
        state.all.push(project);
    },
    deleteProject(state, project){
        state.all = state.all.filter(item => item.id !== project.id);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};