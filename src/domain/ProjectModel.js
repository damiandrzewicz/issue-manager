export default class ProjectModel{
    id;
    name;
    description;
    created;
    subprojectIds;

    constructor(data = null){
        this.id = null;
        this.name = null;
        this.description = null;
        this.created = null;
        this.subprojectIds = [];

        if(data){
            Object.assign(this, data);
        } 
    }

    deepCopy(){
        let copy = new ProjectModel();
        return Object.assign(copy, JSON.parse(JSON.stringify(this)));
    }
}