import axios from 'axios';
import Database from "@/api/database"

class ProjectsAPI extends Database{

    async getAllProjects(){
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
// eslint-disable-next-line no-unused-vars
    async deleteProjects(ids){
        let promises = [];
        ids.forEach(id => {
            promises.push(axios.delete(`${this._uri}/${this._projectsCollectionName}/${id}`));
        });

        return axios.all(promises)
            .then(axios.spread((...responses) => responses ));
    }
}

export default new ProjectsAPI();