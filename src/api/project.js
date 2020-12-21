import axios from 'axios';
import Database from "@/api/database"

class ProjectAPI extends Database{

    async getProjects(){
        return axios.get(`${this._uri}/${this._projectsCollectionName}`)
            .then(response => response.data);
    }

    async addProject(project){
        return axios.post(`${this._uri}/${this._projectsCollectionName}`, project)
            .then(response => response.data); 
    }

    async deleteProject(id){
        return axios.delete(`${this._uri}/${this._projectsCollectionName}/${id}`)
            .then(response => response.data);
    }
    
    async deleteProjects(ids){
        let promises = [];
        ids.forEach(id => {
            promises.push(axios.delete(`${this._uri}/${this._projectsCollectionName}/${id}`));
        });

        return axios.all(promises)
            .then(axios.spread((...responses) => responses ));
    }

    async updateProject(project){
        return axios.put(`${this._uri}/${this._projectsCollectionName}/${project.id}`, project)
            .then(response => response.data);
    }
}

export default new ProjectAPI();