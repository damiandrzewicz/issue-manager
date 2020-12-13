// import axios from 'axios';
// import {ProjectModel} from "@/domain/ProjectModel"

export default class Database{
    constructor(){
        this._uri = "http://localhost:3000";
        this._projectsCollectionName = "project";
    }

    // async getProjects(){
    //     let projectsArray = [];
    //     try{
    //         let res = await axios.get(`${this._uri}/${this._projectsCollectionName}`);
    //         let data =  res.data;
    //         console.log(data);

    //         data.forEach(element => {
    //             let pm = new ProjectModel();
    //             pm.assign(element);
    //             projectsArray.push(pm); 
    //         });
            
    //     }catch(err){
    //         console.log(err);
    //     }
    //     return projectsArray;
    // }

    // async addProject(project){
    //     try{
    //         let res = await axios.post(`${this._uri}/${this._projectsCollectionName}`, project);
    //         let data =  res.data;
    //         console.log(data);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    // async updateProject(project){
    //     try{
    //         let res = await axios.put(`${this._uri}/${this._projectsCollectionName}/${project.id}?_embed=subprojects`, project);
    //         console.log(res.data);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
}