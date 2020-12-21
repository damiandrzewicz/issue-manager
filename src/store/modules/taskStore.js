import Vue from 'vue'
import taskApi from "@/api/task.js"
import TaskModel from "@/domain/TaskModel"

// initial state
const state = () => ({
    tasks: [],
    fetched: false
});

// getters
const getters = {
    getTasks(state){
        Vue.$log.debug("getTasks");
        return state.tasks;
    },


    fetched(state){
        return state.fetched;
    }
}

const actions = {
    getTasks({commit}){
        Vue.$log.debug(`action:getTasks`);
        return taskApi.getTasks()
            .then(data => {
                let tasks = [];
                data.forEach(i => tasks.push(new TaskModel(i)));
                commit("setTasks", tasks);
                Vue.$log.debug(tasks);
                commit("fetched", true);
            })
            .catch(err => Vue.$log.error(err));
    },
    addTask({commit}, payload){
        Vue.$log.debug(`addTask: payload=${JSON.stringify(payload)}`);
        payload.task.created = new Date();
        taskApi.addTask(payload.task)
            .then(data => {
                let task = new TaskModel(data);
                Vue.$log.debug(`new task: ${JSON.stringify(task)}`)
                commit("appendTask", task);
            })
    },

    updateTask({commit}, task){
        Vue.$log.debug(`updateTask: id=${JSON.stringify(task)}`);
        taskApi.updateTask(task)
            .then(data => {
                Vue.$log.debug(`updateTask: data=${JSON.stringify(data)}`)
                commit("updateTask", new TaskModel(data));
            })
            .catch(err => Vue.$log.error(err));
    }
}

const mutations = {
    setTasks(state, tasks){
        state.tasks = tasks;
    },
    appendTask(state, task){
        state.tasks.push(task);
    },
    updateTask(state, task){
        let index = state.tasks.findIndex(item => item.id === task.id);
        state.tasks = [
            ...state.tasks.slice(0, index),
            task,
            ...state.tasks.slice(index + 1)
        ]
    },

    fetched(state, value){
        state.fetched = value;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};