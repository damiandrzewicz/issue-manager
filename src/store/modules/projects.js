import Vue from 'vue'
import projectsApi from "@/api/projects.js"
import ProjectModel from "@/domain/ProjectModel"

// initial state
const state = () => ({
    all: []
});

// getters
const getters = {
    getRootProjects(state){
        Vue.$log.debug("getRootProjects");
        return state.all.filter(project => {return !project.parentId});
    },
    getSubProjects: state => parentId => {
        let subprojects = state.all.filter(project => project.parentId === parentId);
        Vue.$log.debug(`getRootProjects, loaded subprojects for parent project.id=${parentId}: ${JSON.stringify(subprojects)}`);
        return subprojects;
    },
    getSubProjectsCount: (state, getters) => parentId => {
        return getters.getSubProjects(parentId).length;
    },
    getAllSubProjectsIds: (state, getters) => parentId => {
        let ids = [];
        let subprojects = getters.getSubProjects(parentId)
        Vue.$log.debug(`subprojects: ${JSON.stringify(subprojects)}`);
        subprojects.forEach(project => {
                ids.push(project.id);
                ids = ids.concat(getters.getAllSubProjectsIds(project.id));
            })
        Vue.$log.debug(`ids: ${ids}`);
        return ids;
    },

}

const actions = {
    getAllProjects({commit}){
        projectsApi.getAllProjects()
            .then(data => {
                let projects =[];
                data.forEach(element => {
                    projects.push(new ProjectModel(element));
                });
                Vue.$log.debug(`loaded all projects: ${JSON.stringify(projects)}`);
                commit("setProjects", projects);
            })
            .catch(err => Vue.$log.error(err));
    },
    addProject({commit}, project){
        project.created = new Date();
        projectsApi.addProject(project)
            .then(data => {
                let project = new ProjectModel(data);
                Vue.$log.debug(`new project: ${JSON.stringify(project)}`)
                commit("appendProject", project);
            })
    },
    // eslint-disable-next-line no-unused-vars
    deleteProject({commit}, id){
        Vue.$log.debug(`deleteProject: id=${id}`);
        projectsApi.deleteProject(id)
            .then( () => {
                commit("deleteProject", id);
            })
             .catch(err => Vue.$log.error(err));
    },
    deleteProjects({commit}, ids){
        Vue.$log.debug(`deleteProjects: id=${ids}`);
        projectsApi.deleteProjects(ids)
            .then(() => {
                ids.forEach(id => commit("deleteProject", id))
            })
            .catch(err => {Vue.$log.error(err)});
    },
    deleteProjectWithDependencies({ dispatch, getters}, id){
        let ids = [];
        ids.push(id);
        ids = ids.concat(getters.getAllSubProjectsIds(id));
        Vue.$log.debug(`deleteProjectWithDependencies: ids = ${ids}`)
        dispatch("deleteProjects", ids)
    }
};

const mutations = {
    setProjects(state, projects){
        state.all = projects;
    },
    appendProject(state, project){
        state.all.push(project);
    },
    deleteProject(state, id){
        state.all = state.all.filter(item => item.id !== id);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};