export default class Database{
    constructor(){
        this._uri = "http://localhost:3000";
        this._projectsCollectionName = "project";
        this._tasksCollectionName = "task";
    }
}