import axios from 'axios';
import Database from "@/api/database"
import ProjectModel from "@/domain/ProjectModel"

class Projects extends Database{

    async getAllProjects(cb, errorCb){
        let projectsArray = [];
        try{
            let res = await axios.get(`${this._uri}/${this._projectsCollectionName}`);
            let data =  res.data;
            console.log(data);

            data.forEach(element => {
                projectsArray.push(new ProjectModel(element));
            });
            cb(projectsArray);
            
        }catch(err){
            console.log(err);
            errorCb(err);
        }
    }

    async addProject(project, cb, errorCB){
        try{
            let res = await axios.post(`${this._uri}/${this._projectsCollectionName}`, project);
            let data =  res.data;
            cb(project);
            console.log(data);
        }catch(err){
            console.log(err);
            errorCB(err);
        }
    }
}

export default new Projects();