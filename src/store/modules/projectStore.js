import Vue from 'vue'
import projectApi from "@/api/project.js"
import ProjectModel from "@/domain/ProjectModel"

// initial state
const state = () => ({
    all: [],
    fetched: false
});

// getters
const getters = {
    getProjects(state){
        Vue.$log.debug("getProjects");
        return state.all;
    },
    getProjectsNameList(state){
        let names = [];
        state.all.forEach(item => names.push(item.name));
        return names;
    },
    getProjectById: state => (id) => {
        Vue.$log.debug("getProjectById");
        return state.all.find(p => p.id === id);
    },
    getRootProjects(state){
        let rootProjects = [];
        state.all.forEach(item => {
            let found = state.all.filter(el => el.subprojectIds.includes(item.id));
            if(!found.length){
                rootProjects.push(item);
            }
        })
        return rootProjects;
    },
    getParent: state => id => {
        return state.all.find(item => item.subprojectIds.includes(id));
    },
    getAllSubprojectsRecursively: (state, getters) => id => {
        let ids = [];
        let rootProject = getters.getProjectById(id);
        ids = ids.concat(rootProject.id);
        rootProject.subprojectIds.forEach(subprojectId => {
            ids = ids.concat(getters.getAllSubprojectsRecursively(subprojectId));
        });
        return ids;
    },
    fetched(state){
        return state.fetched;
    }

}

const actions = {
    getProjects({commit}){
        Vue.$log.debug(`action:getProjects`);
        return projectApi.getProjects()
            .then(data => {
                let projects = [];
                data.forEach(i => projects.push(new ProjectModel(i)));
                commit("setProjects", projects);
                Vue.$log.debug(projects);
                commit("fetched", true);
            })
            .catch(err => Vue.$log.error(err));
    },
    addProject({commit, dispatch, getters}, payload){
        Vue.$log.debug(`addProject: payload=${JSON.stringify(payload)}`);
        payload.project.created = new Date();
        projectApi.addProject(payload.project)
            .then(data => {
                let project = new ProjectModel(data);
                Vue.$log.debug(`new project: ${JSON.stringify(project)}`)
                commit("appendProject", project);

                //update parent project
                if(payload.parentId){
                    Vue.$log.debug(`addProject: update parentId=${payload.parentId}`);
                    let parent = getters.getProjectById(payload.parentId).deepCopy();
                    parent.subprojectIds.push(project.id);
                    dispatch("updateProject", parent);
                }
            })
    },
    deleteProject({commit}, id){
        Vue.$log.debug(`deleteProject: id=${id}`);
        projectApi.deleteProject(id)
            .then( () => {
                commit("deleteProject", id);
            })
             .catch(err => Vue.$log.error(err));
    },
    deleteProjects({commit}, ids){
        Vue.$log.debug(`deleteProjects: id=${ids}`);
        projectApi.deleteProjects(ids)
            .then(() => {
                ids.forEach(id => commit("deleteProject", id))
            })
            .catch(err => {Vue.$log.error(err)});
    },
    
    deleteProjectWithDependencies({commit, dispatch, getters}, id){    // eslint-disable-line no-unused-vars
        //find parent project and update it
        let parentProject = getters.getProjects.find(item => item.subprojectIds.includes(id));
        if(parentProject){
            let parentProjectDeepCopy = parentProject.deepCopy();
            parentProjectDeepCopy.subprojectIds = parentProject.subprojectIds.filter(item => item !== id);
            dispatch("updateProject", parentProjectDeepCopy)
        }

        let ids = getters.getAllSubprojectsRecursively(id);
        Vue.$log.debug(`deleteProjectWithDependencies: ids=${ids}`);
        dispatch("deleteProjects", ids);
    },
    updateProject({commit}, project){
        Vue.$log.debug(`updateProject: id=${JSON.stringify(project)}`);
        projectApi.updateProject(project)
            .then(data => {
                 Vue.$log.debug(`updateProject: data=${JSON.stringify(data)}`)
                commit("updateProject", new ProjectModel(data));
            })
            .catch(err => Vue.$log.error(err));
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
    },
    updateProject(state, project){
        let index = state.all.findIndex(item => item.id === project.id);
        state.all = [
            ...state.all.slice(0, index),
            project,
            ...state.all.slice(index + 1)
        ]
    },
    fetched(state, value){
        state.fetched = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};