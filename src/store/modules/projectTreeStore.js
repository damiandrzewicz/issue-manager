import Vue from 'vue'

// import Vue from 'vue'

// initial state
const state = () => ({
    selectedIds: []
});

// getters
const getters = {
    getSelectedIds(state){
        Vue.$log.debug(`getSelectedIds: getSelectedIds=${state.selectedIds}`)
        return state.selectedIds;
    },
    getProjectTree(state, getters, rootState, rootGetters){ // eslint-disable-line no-unused-vars
        let tree = [];
        let rootProjects = rootGetters["projectStore/getRootProjects"];
        Vue.$log.debug(`rootProjects=${JSON.stringify(rootProjects)}`)

        let buildNode = (project) => {
            let node = {
                id: project.id,
                name: project.name,
                subprojects: []
            }
            project.subprojectIds.forEach(subprojectId => {
                let subproject =  rootGetters["projectStore/getProjectById"](subprojectId);
                node.subprojects.push(buildNode(subproject));
            })
            return node;
        }

        rootProjects.forEach(project => {
            tree.push(buildNode(project))
        });
        return tree;
    }
}

const actions = {
    updateSelectedIds({ commit }, ids){
        commit("updateSelectedIds", ids)
    },

    selectAll({commit, rootGetters}){
        let projects = rootGetters["projectStore/getProjects"];
        let ids =[];
        projects.forEach(p => ids.push(p.id));
        commit("updateSelectedIds", ids);
    }
    
}

const mutations = {
    updateSelectedIds(state, ids){
        state.selectedIds = ids;
        Vue.$log.debug(`updateSelectedIds: selectedIds=${this.state.selectedIds}`)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};