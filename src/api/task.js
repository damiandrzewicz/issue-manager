import axios from 'axios';
import Database from "@/api/database"

class TaskAPI extends Database{
    async getTasks(){
        return axios.get(`${this._uri}/${this._tasksCollectionName}`)
            .then(response => response.data);
    }

    async getTask(id){
        return axios.get(`${this._uri}/${this._tasksCollectionName}/${id}`)
            .then(response => response.data);
    }

    async addTask(task){
        return axios.post(`${this._uri}/${this._tasksCollectionName}`, task)
            .then(response => response.data); 
    }

    async deleteTask(id){
        return axios.delete(`${this._uri}/${this._tasksCollectionName}/${id}`)
            .then(response => response.data);
    }

    async deleteTasks(ids){
        let promises = [];
        ids.forEach(id => {
            promises.push(axios.delete(`${this._uri}/${this._tasksCollectionName}/${id}`));
        });

        return axios.all(promises)
            .then(axios.spread((...responses) => responses ));
    }

    async updateTask(task){
        return axios.put(`${this._uri}/${this._tasksCollectionName}/${task.id}`, task)
            .then(response => response.data);
    }
}

export default new TaskAPI();